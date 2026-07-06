variable "aws_region" {
  type        = string
  description = "AWS region to deploy resources"
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Project name to prefix resources"
  default     = "ahmedwaelcloud"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
  default     = "production"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_1_cidr" {
  type        = string
  description = "CIDR block for public subnet 1"
  default     = "10.0.1.0/24"
}

variable "public_subnet_2_cidr" {
  type        = string
  description = "CIDR block for public subnet 2"
  default     = "10.0.2.0/24"
}

variable "container_cpu" {
  type        = string
  description = "Fargate CPU units (1024 = 1 vCPU)"
  default     = "256" # 0.25 vCPU
}

variable "container_memory" {
  type        = string
  description = "Fargate memory (in MB)"
  default     = "512" # 0.5 GB
}

variable "desired_count" {
  type        = number
  description = "Number of ECS tasks to run"
  default     = 1
}
