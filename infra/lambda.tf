# Install npm dependencies before packaging
resource "null_resource" "lambda_deps" {
  triggers = {
    package_json = filemd5("${path.module}/lambda/package.json")
  }

  provisioner "local-exec" {
    command     = "npm install --production"
    working_dir = "${path.module}/lambda"
  }
}

# Zip the lambda source + node_modules
data "archive_file" "lambda_zip" {
  depends_on  = [null_resource.lambda_deps]
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
  excludes    = ["package-lock.json"]
}

# IAM role for Lambda execution
resource "aws_iam_role" "lambda_exec" {
  name = "bashies-contact-email-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_exec" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda function
resource "aws_lambda_function" "send_contact_email" {
  function_name    = "bashies-send-contact-email"
  role             = aws_iam_role.lambda_exec.arn
  runtime          = "nodejs22.x"
  handler          = "index.handler"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 30

  environment {
    variables = {
      SMTP_HOST = "smtpout.secureserver.net"
      SMTP_PORT = "465"
      SMTP_USER = "hello@bashies.co.za"
      SMTP_PASS = "&5!>%7B+p?bzaYC"
    }
  }
}

# Allow API Gateway to invoke the Lambda
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.send_contact_email.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*"
}
