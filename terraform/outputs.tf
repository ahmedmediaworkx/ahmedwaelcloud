output "ecr_repository_url" {
  value       = aws_ecr_repository.app.repository_url
  description = "ECR Repository URL to push image to"
}

output "alb_dns_name" {
  value       = aws_lb.main.dns_name
  description = "Public URL of the application load balancer"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "ECS cluster name"
}

output "ecs_service_name" {
  value       = aws_ecs_service.main.name
  description = "ECS service name"
}
