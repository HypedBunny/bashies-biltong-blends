output "api_url" {
  description = "Base URL for the contact API — set this as VITE_API_URL in your frontend environment"
  value       = aws_apigatewayv2_stage.default.invoke_url
}

output "lambda_function_name" {
  description = "Lambda function name"
  value       = aws_lambda_function.send_contact_email.function_name
}
