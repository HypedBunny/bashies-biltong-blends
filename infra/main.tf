terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }

  # Uncomment and configure to use remote state (recommended for production):
  # backend "s3" {
  #   bucket = "your-tfstate-bucket"
  #   key    = "bashies/contact-email/terraform.tfstate"
  #   region = "af-south-1"
  # }
}

provider "aws" {
  region = var.aws_region
}
