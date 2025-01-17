package com.email.writer.app;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URI;
import java.util.Map;

@Service
public class EmailGeneratorService
{

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey; 

    URI uri = URI.create(geminiApiUrl.trim() + "?key=" + geminiApiKey.trim());

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest)
    {

        //Build a prompt
        String prompt = buildprompt(emailRequest);

        //Craft a Request
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]
                        {
                                Map.of("parts", new Object[]{
                                        Map.of("text", prompt)

                                })

                        }
        );

        //Do request and get response
        String response = webClient.post().uri(uri)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //Extract and return response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response)
    {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text")
                    .asText();
        }
        catch(Exception e)
        {
            return "Error processing request: " + e.getMessage();
        }
    }

    private String buildprompt(EmailRequest emailRequest)
    {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email" +
                "content. Please don't generate a subject line ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty())
        {
            prompt.append("Use a").append(emailRequest.getTone()).append("tone");
        }

        prompt.append("\n Original Email: \n").append(emailRequest.getEmailcontent());
        return prompt.toString();
    }
}
