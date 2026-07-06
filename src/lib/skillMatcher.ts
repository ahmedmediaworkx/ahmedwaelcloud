export function matchesSkill(skillName: string, tech: string): boolean {
  const s = skillName.toLowerCase().trim();
  const t = tech.toLowerCase().trim();
  
  // Direct matches or substring containment
  if (t === s || t.includes(s) || s.includes(t)) {
    return true;
  }
  
  // Direct mappings for specific multi-part names
  if (s === "aws ec2/vpc/iam" && (t.includes("aws") || t.includes("ec2") || t.includes("vpc") || t.includes("iam"))) {
    return true;
  }
  if (s === "amazon eks/ecs" && (t.includes("eks") || t.includes("ecs") || t.includes("kubernetes"))) {
    return true;
  }
  if (s === "aws rds/s3" && (t.includes("rds") || t.includes("s3") || t.includes("database"))) {
    return true;
  }
  if (s === "aws route53 & cloudfront" && (t.includes("route") || t.includes("cloudfront") || t.includes("dns"))) {
    return true;
  }
  if (s === "kubernetes" && (t.includes("eks") || t.includes("k8s") || t.includes("kubernetes"))) {
    return true;
  }
  if (s === "helm charts" && t.includes("helm")) {
    return true;
  }
  if (s === "container security" && (t.includes("docker") || t.includes("trivy") || t.includes("security") || t.includes("sealedsecrets"))) {
    return true;
  }
  if (s === "hcl declarations" && (t.includes("terraform") || t.includes("hcl"))) {
    return true;
  }
  if (s === "git & git workflows" && (t.includes("git") || t.includes("github"))) {
    return true;
  }
  if (s === "docker registries (ecr/dockerhub)" && (t.includes("ecr") || t.includes("docker"))) {
    return true;
  }
  if (s === "grafana dashboards" && t.includes("grafana")) {
    return true;
  }
  if (s === "linux bash scripting" && (t.includes("linux") || t.includes("bash") || t.includes("shell"))) {
    return true;
  }
  if (s === "linux networking & ssh" && (t.includes("linux") || t.includes("network") || t.includes("ssh"))) {
    return true;
  }

  return false;
}

export function isProjectRelatedToSkill(projectTechStack: string[], skillName: string): boolean {
  if (!skillName) return false;
  return projectTechStack.some(tech => matchesSkill(skillName, tech));
}
