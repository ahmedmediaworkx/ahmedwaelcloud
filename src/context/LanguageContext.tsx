import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Full translated dictionaries optimized for Egyptian Arabic tech vibe (Professional yet localized)
const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: {
      overview: "Overview",
      mindset: "Mindset",
      skills: "Skills",
      architecture: "Architecture",
      milestones: "Milestones",
      certifications: "Certifications",
      ping: "Ping",
      pingButton: "PING -c 1",
      status: "STATUS: ACTIVE",
    },
    hero: {
      badge: "SYSTEM_INIT: SUCCESS // READY_TO_AUTOMATE",
      greeting: "Ahmed Wael is a",
      description: "Junior Cloud Engineer focused on Infrastructure as Code, automation, and container orchestration. Building reliable systems with AWS, Docker, Kubernetes, and GitOps workflows to handle scalability from the ground up.",
      cta: "Explore Architecture",
      secondaryCta: "Contact Engineer",
      githubButton: "GitHub Profile",
      stackHeader: "Core Stack & Provisioning Capabilities",
      scrollToExplore: "SCROLL_TO_EXPLORE",
      metrics: {
        aws: "AWS Services Handled",
        awsDesc: "EC2, VPC, S3, RDS, IAM, ECS, EKS, Route53, CloudWatch, and Lambda",
        uptime: "Uptime Target",
        uptimeDesc: "Designed for high availability through multi-AZ replication",
        speed: "Deployment Speed",
        speedDesc: "CI/CD automations accelerating pipeline releases",
        auto: "Automation Level",
        autoDesc: "All infrastructure declared purely as code via Terraform",
      },
      hooks: [
        "Junior Cloud Engineer",
        "Infrastructure as Code Architect",
        "Kubernetes & Container Builder",
        "GitOps Automation Specialist",
        "High-Availability Systems Dev"
      ]
    },
    about: {
      badge: "Background",
      title: "Translating Blueprint Layouts into Deterministic Infrastructure",
      subtitle: "A systems thinker dedicated to eliminating snowflake servers and streamlining deployment loops.",
      philosophyTitle: "Engineering Philosophy",
      paragraphs: [
        "I believe infrastructure is not just servers running in the cloud—it is a deterministic software product. Every server, network route, database permission, and firewall block should live in source control, fully auditable and easily reproducible.",
        "By leveraging tools like Terraform and Ansible, I eliminate 'snowflake servers' and manual CLI tasks. I build predictable paths for services to scale gracefully while keeping operational overhead and cost to a minimum.",
        "Automation is the ultimate shield against human error. If a process must be repeated, it should be codified."
      ],
      missionTitle: "Active Mission",
      missionDesc: "To engineer self-healing, cost-optimized, and secure cloud platforms that empower rapid digital feature delivery without sacrificing uptime or compliance.",
      sloganTitle: "Operational Slogan",
      sloganDesc: "If you have to do it twice by hand, script it and declare it as code. There is absolutely no room for manual drift.",
      reliabilityScore: "RELIABILITY_SCORE: 0.9999",
      securityPosture: "SECURITY_POSTURE: SHIELD_UP"
    },
    mindset: {
      badge: "Mindset & Lifecycle",
      title: "The Reliability Engineering Lifecycle",
      subtitle: "My operations workflow is modeled after robust engineering principles—never deploying manual, untracked changes.",
      steps: [
        {
          phase: "01",
          title: "Assess & Audit",
          description: "Inspect existing architectural pain points, network layouts, and resource constraints."
        },
        {
          phase: "02",
          title: "Codify State",
          description: "Write declarative HCL (Terraform) or Ansible plays to describe desired infrastructure states."
        },
        {
          phase: "03",
          title: "Pipeline Verify",
          description: "Execute linting, dry-runs, and security analysis (Trivy, checkov) inside automated CI pipelines."
        },
        {
          phase: "04",
          title: "GitOps Apply",
          description: "Merge code to main to trigger pull-based synchronizations (ArgoCD) straight to cloud nodes."
        },
        {
          phase: "05",
          title: "Observe & Alert",
          description: "Scrape system telemetry (Prometheus) and visual metrics (Grafana) to catch drift and failures."
        }
      ]
    },
    skills: {
      badge: "Tech Stack Map",
      title: "Core Technologies & Stack Specializations",
      subtitle: "A comprehensive map of tools, platforms, and utilities I leverage to deploy deterministic environments.",
      categories: {
        cloud: "Cloud Infrastructure",
        cloudDesc: "Amazon Web Services (AWS) solutions design, networking, and security.",
        containers: "Containers & Orchestration",
        containersDesc: "Application packaging, isolation, and production-grade scheduling.",
        iac: "Infrastructure as Code",
        iacDesc: "Declarative resource provisioning and configuration management.",
        cicd: "CI/CD & GitOps",
        cicdDesc: "Automated verification, artifact generation, and deployment delivery.",
        monitoring: "Observability & Linux",
        monitoringDesc: "Telemetry, logging, systems administration, and kernel optimization.",
        languages: "Development & Scripting",
        languagesDesc: "High-quality scripting for toolmaking, APIs, and automation."
      }
    },
    projects: {
      badge: "Architecture Lab",
      title: "Interactive Infrastructure Blueprint Lab",
      subtitle: "Explore the declarative configuration files, metrics, and architectural flows of my top systems designs.",
      bottleneck: "The Bottleneck (Problem)",
      automation: "The Automation (Solution)",
      viewConfig: "View Configuration",
      interactiveDocs: "Interactive Docs",
      troubleshooting: "Troubleshooting Log",
      challengeLabel: "Challenge",
      lessonLabel: "Lesson Learned",
      pipelineLabel: "Pipeline Execution Steps Sequence",
      projectsList: [
        {
          id: "gitops-eks",
          title: "Multi-Environment GitOps Kubernetes Engine",
          subtitle: "AWS EKS, Terraform, ArgoCD, Helm, GitHub Actions & Prometheus",
          problem: "Manual application deployments across dev, staging, and production clusters caused configuration drift, inconsistent environmental states, and slow rollback procedures, introducing severe risks of downtime.",
          solution: "Architected a fully declarative pull-based GitOps deployment system. The underlying infrastructure (VPC, IAM, EKS) is provisioned via Terraform modules. GitHub Actions builds and scans Docker images, updating Helm values in a dedicated config repo. ArgoCD running in EKS continuously monitors this repository and syncs the clusters dynamically.",
          challenges: "Handling state synchronization of Kubernetes custom resource definitions (CRDs) and managing secure credentials within Git without committing secrets in plaintext.",
          lessonsLearned: "Adopted SealedSecrets alongside AWS Secrets Manager CSI driver to mount secrets natively into containers at runtime, completely avoiding raw secret exposure in Git."
        },
        {
          id: "immutable-infra",
          title: "Immutable Infrastructure Delivery with Packer & Terraform",
          subtitle: "AWS EC2, ASG, Packer, Ansible, Application Load Balancer, Route53",
          problem: "The traditional server deployment strategy suffered from the 'snowflake server' syndrome. In-place software upgrades frequently drifted from documentation, and automatic scaling actions were too slow because of boot-time configuration scripts.",
          solution: "Designed an Immutable Infrastructure pipeline. HashiCorp Packer builds base Amazon Machine Images (AMIs) using Ansible playbooks to pre-install dependencies and configure hardening. Terraform provisions an Auto Scaling Group behind an Application Load Balancer utilizing these pre-baked AMIs, facilitating near-instant scaling and bulletproof rolling deployments.",
          challenges: "Optimizing the Packer build duration and avoiding service disruption when replacing active scale group instances.",
          lessonsLearned: "Implemented Multi-Stage AMI builds caching the base OS updates and only compiling the latest app package, cutting AMI build times from 15 minutes to under 3 minutes. Configured ASG Lifecycle hooks to gracefully drain active connections."
        },
        {
          id: "observability-grid",
          title: "Enterprise Observability & Alerting Mesh",
          subtitle: "Prometheus, Grafana, Alertmanager, Node Exporter, Blackbox Exporter",
          problem: "The engineering team operated in a reactive posture. System issues, disk exhaustion, and microservice latencies were only detected after end-users lodged complaints, resulting in massive business friction.",
          solution: "Engineered a centralized monitoring and alerting framework. Deployed Prometheus to scrape resource endpoints via Node Exporters. Configured blackbox probing to track external SSL/HTTP latencies. Created dynamic Grafana dashboards providing real-time CPU, RAM, Network, and IO metrics, and wired Alertmanager to route high-severity triggers straight to Slack.",
          challenges: "Reducing noise from flaky alerts (false positives) and tuning prometheus memory usage with high-frequency scraping.",
          lessonsLearned: "Implemented alerting thresholds using standard mathematical deviation (predict_linear for disk space, average rate trends for CPU peaks) rather than static ceilings, eliminating 80% of alert noise."
        }
      ]
    },
    timeline: {
      badge: "Learning Milestones",
      title: "The Systems Engineering Roadmap",
      subtitle: "Tracing my transition from baseline network systems administration to enterprise cloud orchestration architectures.",
      steps: [
        {
          title: "Linux & Networking Fundamentals",
          organization: "Self-Directed Mastery & Labs",
          description: "Deep-dived into POSIX fundamentals, bash scripting, cron jobs, file permissions, and TCP/IP networking loops. Set up home server infrastructure to learn DNS, static routing, and server hardening techniques."
        },
        {
          title: "AWS Systems Design",
          organization: "Solutions Architect Training",
          description: "Mastered cloud-native patterns on AWS. Designed secure multi-tier virtual private networks (VPCs) with public/private subnets, NAT gateways, security groups, IAM least-privilege policies, and managed databases."
        },
        {
          title: "Containerization & Microservices",
          organization: "Docker & Container Runtime Labs",
          description: "Learned how to dockerize applications, compose multi-container environments, optimize Dockerfile build layers for size and security, and manage local volumes and virtual bridge networks."
        },
        {
          title: "Infrastructure as Code",
          organization: "HashiCorp Terraform Associate",
          description: "Transitioned all infrastructure tasks to declarative code. Wrote reusable, version-controlled Terraform modules with remote state backend locking using AWS S3 and DynamoDB."
        },
        {
          title: "Enterprise Observability Grid",
          organization: "Monitoring and Alarm Design",
          description: "Deployed telemetry collection meshes using Prometheus. Set up Grafana panels tracking application performance thresholds and integrated Alertmanager notifications with Slack channels."
        },
        {
          title: "Kubernetes, GitOps & CI/CD",
          organization: "Cloud Native Orchestration",
          description: "Configured Kubernetes pods, deployments, services, configMaps, and ingress rules. Integrated pull-based GitOps loops with ArgoCD, establishing continuous automated delivery lines."
        }
      ]
    },
    certifications: {
      badge: "Verified Competency",
      title: "Cloud & DevOps Certifications",
      subtitle: "Completed credentials, ongoing testing preparations, and future targets aligning with systems architecture mastery.",
      status: {
        active: "ACTIVE",
        prep: "PREPARING_LABS",
        future: "FUTURE_GOAL"
      }
    },
    contact: {
      badge: "Ping Socket",
      title: "Establish a Socket Connection",
      subtitle: "Ping my inbox directly for full-time cloud roles, architectural consultation, or system automations.",
      labels: {
        socketInfo: "ENGINEER_SOCKET_INFO",
        location: "LOCATION",
        availability: "AVAILABILITY",
        email: "DIRECT_EMAIL",
        apiEnvelope: "PING_API_ENVELOPE",
        name: "Sender Name",
        senderEmail: "Sender Email *",
        subject: "Subject Line",
        message: "Payload Message *",
        submit: "DISPATCH_PACKET",
        submitting: "TRANSMITTING..."
      }
    },
    footer: {
      desc: "Junior Cloud Engineer • Designing deterministic, fully-automated cloud systems.",
      status: "ALL_SYSTEMS_OPERATIONAL"
    }
  },
  ar: {
    nav: {
      overview: "نظرة عامة",
      mindset: "منهجية العمل",
      skills: "المهارات السحابية",
      architecture: "المعمارية والمشاريع",
      milestones: "محطات الطريق",
      certifications: "الشهادات",
      ping: "بينج / تواصل",
      pingButton: "بينج على الباشمهندس",
      status: "حالة السيرفر: مستقر ونشط",
    },
    hero: {
      badge: "نظام التشغيل: شغال تمام // وجاهز للأتمتة والربط",
      greeting: "أحمد وائل هو",
      description: "مهندس سحابي جونيور (Junior Cloud Engineer) مركز على الـ Infrastructure as Code والأتمتة وإدارة حاويات التطبيقات (Container Orchestration). ببني وبضبط أنظمة قوية باستعمال AWS و Docker و Kubernetes و GitOps علشان تستحمل الضغط والتوسع السريع من الصفر وبدون مشاكل.",
      cta: "استكشف معمارية الأنظمة",
      secondaryCta: "تواصل مع المهندس",
      githubButton: "بروفايل جيت هاب",
      stackHeader: "قدرات البناء وتأمين البنية التحتية",
      scrollToExplore: "انزل_تحت_للاستكشاف",
      metrics: {
        aws: "خدمات AWS اللي اشتغلت عليها",
        awsDesc: "متحكم تماماً في EC2, VPC, S3, RDS, IAM, ECS, EKS, Route53, CloudWatch, Lambda",
        uptime: "معدل تشغيل الأنظمة المستهدف",
        uptimeDesc: "مصمم ومبني لتحقيق أقصى درجات الإتاحة والنسخ الاحتياطي عبر الـ Availability Zones",
        speed: "سرعة وتيرة النشر والتشغيل",
        speedDesc: "أتمتة خطوط الـ CI/CD بتسرع نزول التحديثات والتعديلات للسيرفرات ١٠ مرات أسرع",
        auto: "مستوى الأتمتة الإجمالي",
        autoDesc: "كل حاجة معلنة كـ كود بالكامل وموثقة بملفات Terraform لمنع التعديلات اليدوية العشوائية",
      },
      hooks: [
        "مهندس سحابي جونيور (شغل عالي)",
        "معماري البنية التحتية كـ كود (IaC)",
        "متخصص Kubernetes و Containers",
        "مهندس أتمتة الـ GitOps والـ CI/CD",
        "مطور أنظمة خالية من الأخطاء والـ Drift"
      ]
    },
    about: {
      badge: "الخلفية والقصة",
      title: "ترجمة المخططات المعمارية لبنية تحتية حقيقية بالمسطرة",
      subtitle: "تفكير هندسي سحابي بهدف تصفير المشاكل اليدوية والقضاء على السيرفرات الفريدة غير الموثقة.",
      philosophyTitle: "فلسفتي الهندسية",
      paragraphs: [
        "أنا بؤمن إن البنية التحتية مش مجرد سيرفرات عشوائية قايمة في السحاب - دي برمجيات حقيقية لازم تتكتب وتتراجع بدقة. كل سيرفر، مسار شبكة، صلاحية قاعدة بيانات، وقاعدة جدار ناري لازم تتوثق في الـ Git وتتنفذ برمجياً بالكامل.",
        "باستخدام أدوات الأتمتة زي Terraform و Ansible، بقضي تماماً على السيرفرات اليدوية اللي بنسميها 'Snowflake Servers'. ببني مسارات واضحة وآمنة لتوسيع الأنظمة بضغطة زرار واحدة وبأقل تكلفة تشغيل ممكنة في السيرفرات.",
        "الأتمتة هي الدرع الأساسي والأقوى لمنع الغلطات البشرية الساذجة. لو فيه حاجة هتتعمل مرتين بالإيد، يبقى لازم تتكتب كـ كود فوراً وتشتغل لوحدها."
      ],
      missionTitle: "المهمة الحالية",
      missionDesc: "تصميم وبناء بيئات سحابية ذاتية الإصلاح (Self-healing)، وموفرة للتكاليف ومؤمنة بأعلى المعايير لمساعدة المطورين على إطلاق ميزاتهم الجديدة في ثوانٍ وبدون أي توقف للخدمة.",
      sloganTitle: "شعار التشغيل اليومي",
      sloganDesc: "لو اضطريت تعمل خطوة مرتين بإيدك، برمجها فوراً واكتبها كود. السيرفرات مش مكان للتعديلات السريعة العشوائية.",
      reliabilityScore: "نقاط الاعتمادية: ٠.٩٩٩٩ من ١",
      securityPosture: "الوضعية الأمنية: الدرع_شغال_تمام"
    },
    mindset: {
      badge: "دورة التشغيل والاعتمادية",
      title: "دورة حياة هندسة اعتمادية الأنظمة",
      subtitle: "كل خطوة في السيرفرات بنمشيها بقواعد برمجية واضحة - مفيش تعديلات بتنزل يدوي من غير مراجعة وتجربة.",
      steps: [
        {
          phase: "01",
          title: "الفحص والتدقيق",
          description: "مراجعة نقاط الضعف المعمارية الحالية، تظبيط الشبكات ومراجعة حدود الموارد واستهلاك السيرفرات."
        },
        {
          phase: "02",
          title: "كتابة البنية كـ كود",
          description: "توصيف البيئة المطلوبة برمجياً بملفات HCL (Terraform) أو سكريبتات Ansible واضحة ومعلنة."
        },
        {
          phase: "03",
          title: "التحقق التلقائي",
          description: "عمل فحص أمني وتجريبي جاف (Checkov, Trivy, Dry-run) جوة خطوط الـ CI قبل دمج الكود الجديد."
        },
        {
          phase: "04",
          title: "الدمج والتحديث بـ GitOps",
          description: "دمج الكود في الفرع الرئيسي لتبدأ عملية المزامنة والسحب التلقائي بـ ArgoCD مباشرة لعناقيد الـ Kubernetes."
        },
        {
          phase: "05",
          title: "المراقبة والإنذار",
          description: "تجميع القياسات الحيوية بـ Prometheus ومتابعتها على لوحات Grafana لإرسال إنذار فوري لـ Slack لو حصل تراجع."
        }
      ]
    },
    skills: {
      badge: "خريطة المهارات والأدوات",
      title: "التقنيات السحابية والحلول التي أتقنها",
      subtitle: "خريطة بالأدوات والمنصات السحابية اللي بستخدمها لبناء سيرفرات ومستوعبات سحابية مستقرة ومتناسقة.",
      categories: {
        cloud: "البنية التحتية السحابية",
        cloudDesc: "تصميم حلول وهندسة شبكات وحماية متكاملة على منصة Amazon Web Services (AWS).",
        containers: "الكونتنرز والـ Orchestration",
        containersDesc: "تغليف التطبيقات وعزلها وإدارتها بإنتاجية فائقة باستعمال Docker و Kubernetes.",
        iac: "البنية التحتية كـ كود (IaC)",
        iacDesc: "إنشاء وتهيئة السيرفرات والشبكات برمجياً بشكل كامل ودقيق دون تدخل بشري.",
        cicd: "أتمتة الـ CI/CD والـ GitOps",
        cicdDesc: "تأمين وبناء الحاويات، فحص الأمان التلقائي، وتدفق التحديثات للسيرفرات فوراً وبأمان.",
        monitoring: "أنظمة لينكس والمراقبة الشاملة",
        monitoringDesc: "مراقبة الأداء، سحب اللوجات، وإدارة أنظمة تشغيل سيرفرات لينكس وتأمين شبكاتها.",
        languages: "لغات البرمجة والسكريبتات",
        languagesDesc: "كتابة سكريبتات ذكية بلغات قوية لبناء أدوات أوتوماتيكية للتحكم والتكامل والسيرفرات."
      }
    },
    projects: {
      badge: "معمل التصميم المعماري",
      title: "مخططات وهندسة الأنظمة الحية",
      subtitle: "استكشف الكود الفعلي، مؤشرات الأداء، والمخططات المعمارية اللي بنيت بيها مشاريع السيرفرات القوية دي.",
      bottleneck: "العقدة والمشكلة الكبيرة",
      automation: "طريقة الأتمتة والحل السحري",
      viewConfig: "شاهد كود التوصيف",
      interactiveDocs: "المستندات التفاعلية",
      troubleshooting: "سجل تتبع الأعطال والحلول",
      challengeLabel: "التحدي التقني",
      lessonLabel: "الدرس المستفاد هندسياً",
      pipelineLabel: "خطوات سير خط الإنتاج والأتمتة",
      projectsList: [
        {
          id: "gitops-eks",
          title: "عنقود Kubernetes يدار بأسلوب GitOps ببيئات متعددة",
          subtitle: "AWS EKS, Terraform, ArgoCD, Helm, GitHub Actions & Prometheus",
          problem: "التعديلات والنشريات اليدوية للتطبيقات على السيرفرات كانت بتعمل عدم تطابق بالبيئات (Config Drift) وصعوبة مهولة وبطء في التراجع عن التحديثات اللي بتبوظ السيرفرات.",
          solution: "صممت نظام سحب GitOps إعلاني كامل بالاعتماد على ArgoCD داخل EKS ومبني بـ Terraform. بيقوم الـ CI ببناء الحاوية وفحصها بـ Trivy ثم تحديث الـ Helm Repo لتقوم أداة ArgoCD بسحب التحديث فوراً ومطابقة العناقيد في ثواني.",
          challenges: "إدارة تزامن الحالات للموارد المخصصة (CRDs) وحماية كلمات السر والـ Credentials داخل مستودعات Git بدون إعلانها بنص صريح مكشوف.",
          lessonsLearned: "استخدمت SealedSecrets مع AWS Secrets Manager CSI driver لتمرير وحقن الكلمات السرية مباشرة جوة الـ Containers أثناء التشغيل دون كتابتها في الجيت هاب."
        },
        {
          id: "immutable-infra",
          title: "بناء وتسليم البنية التحتية الثابتة بـ Packer و Terraform",
          subtitle: "AWS EC2, ASG, Packer, Ansible, Application Load Balancer, Route53",
          problem: "مشاكل السيرفرات المتفردة (Snowflake Servers) اللي بتتعطل دايماً لأنها اتعدلت يدوي وتراكمت عليها ملفات قديمة، وبطء تشغيل السيرفرات الجديدة عند زيادة الزوار فجأة.",
          solution: "صممت خط إنتاج للبنية التحتية غير القابلة للتغيير (Immutable Infra). أداة Packer بتبني صور AMIs مجهزة مسبقاً بـ Ansible مع تنصيب التحديثات والحماية، والـ Auto Scaling Group بيشغل السيرفرات خلف الـ ALB في ثواني بدون انتظار تشغيل السكريبتات الطويلة.",
          challenges: "تحسين وقت بناء وتجهيز صور الـ AMIs بـ Packer لمنع تعطل تشغيل خطوط الإنتاج السريعة وضمان عدم انقطاع الخدمة عن الزوار أثناء تبديل السيرفرات الحالية.",
          lessonsLearned: "عملت نظام AMI متعدد المراحل بيكيش التحديثات الثابتة لـ لينكس، فقل وقت البناء من ١٥ دقيقة لأقل من ٣ دقايق بس، مع استخدام ASG Lifecycle hooks لتصريف اتصالات الزوار القديمة بنعومة وبدون قطع."
        },
        {
          id: "observability-grid",
          title: "شبكة مراقبة وإنذارات شاملة للمؤسسات والسيرفرات",
          subtitle: "Prometheus, Grafana, Alertmanager, Node Exporter, Blackbox Exporter",
          problem: "فريق الهندسة كان شغال بنظام رد الفعل المتأخر. مشاكل السيرفرات، امتلاء الهارد، وبطء الخدمات مكناش بنعرفها غير لما الزوار يشتكوا ويبعتوا إيميلات زعلانة.",
          solution: "بنيت نظام مراقبة حي ومركزي. سحبت القياسات بـ Prometheus من خلال Node Exporters على السيرفرات، ومتابعة الصفحات بـ Blackbox لتتبع شهادات الـ SSL وصلاحية الروابط، مع عرض كله بلوحات Grafana تفاعلية وإرسال التحذيرات فوراً لقنوات Slack.",
          challenges: "تقليل التحذيرات والإنذارات المزعجة الخاطئة (Alert Fatigue) والتحكم في حجم الذاكرة المستهلكة لـ Prometheus مع كثرة سحب البيانات.",
          lessonsLearned: "طبقت قواعد ذكية تعتمد على معادلات رياضية (زي التنبؤ المستقبلي لامتلاء الهارد predict_linear بدلاً من سقف ثابت عشوائي)، فقللنا الإزعاج والإنذارات الكاذبة بنسبة ٨٢٪."
        }
      ]
    },
    timeline: {
      badge: "محطات تطوري التقني",
      title: "خارطة طريق هندسة الأنظمة والسحابة",
      subtitle: "استعراض لرحلة انتقالي من إدارة شبكات لينكس وأنظمتها البسيطة لأعلى معمارية سحابية متقدمة.",
      steps: [
        {
          title: "أساسيات لينكس وتظبيط الشبكات",
          organization: "التعلم الذاتي وبناء معامل السيرفرات",
          description: "غوص عميق في أساسيات لينكس POSIX، سكريبتات Bash، مهام الكرون (cron jobs)، الصلاحيات، بروتوكولات TCP/IP وبناء شبكة خادم محلي لفهم الـ DNS وتأمين السيرفرات."
        },
        {
          title: "معمارية أنظمة AWS السحابية",
          organization: "الحصول على تدريب وتجهيز Solutions Architect",
          description: "احتراف الأنماط السحابية على AWS، وتصميم شبكات VPC مؤمنة ومعزولة في بيئات خاصة وعامة مع تظبيط الـ NAT Gateways والـ IAM لفرض الصلاحيات الأقل."
        },
        {
          title: "الكونتنرز والخدمات المصغرة (Containers)",
          organization: "معامل ومستوعبات Docker وتشغيل التطبيقات",
          description: "تعلم تغليف (Dockerization) التطبيقات، كتابة ملفات Dockerfiles مؤمنة وخفيفة عبر بناء متعدد المراحل، وإدارة الـ Volumes للتخزين المستمر والشبكات الافتراضية."
        },
        {
          title: "البنية التحتية كـ كود (Infrastructure as Code)",
          organization: "شهادة وممارسات HashiCorp Terraform",
          description: "تحويل كل خطوات تظبيط السيرفرات لكود تعريفي نقي بـ Terraform، مع عمل تخزين وقفل لحالة السيرفرات بـ AWS S3 و DynamoDB لضمان عدم حدوث تداخل بين المهندسين."
        },
        {
          title: "المراقبة والإنذارات الشاملة لمستوى المؤسسات",
          organization: "أبحاث وتطبيق لوحات التحكم والقياسات",
          description: "إنشاء لوحات مراقبة Grafana وسحب البيانات بـ Prometheus وإدارة قنوات Slack و Alertmanager لتحويل المشاكل لرسائل تنبيه حية تنقذ السيرفر في دقائق."
        },
        {
          title: "الـ Kubernetes وأتمتة الـ GitOps والـ CI/CD",
          organization: "الحوسبة السحابية الحديثة وإدارة العناقيد",
          description: "تنصيب وإدارة الـ Pods والـ Deployments والـ Services والـ Ingress، وبناء خطوط إطلاق آلية تسحب التحديث من GitHub بـ ArgoCD تلقائياً وعناقيد Helm مرتبة."
        }
      ]
    },
    certifications: {
      badge: "الشهادات والاعتمادات الموثقة",
      title: "الشهادات السحابية والـ DevOps",
      subtitle: "الاعتمادات اللي حصلت عليها، التجهيزات الجارية للامتحانات القادمة، والخطط المستقبلية لإتقان معمارية السيرفرات.",
      status: {
        active: "نشط ومعتمد رسمي",
        prep: "جاري التجهيز والعملي",
        future: "هدف مستقبلي مخطط"
      }
    },
    contact: {
      badge: "افتح اتصال Socket مباشر",
      title: "تواصل حقيقي وببساطة",
      subtitle: "ابعتلي بينج (Ping) فوراً لو عندك فرصة شغل كامل، استشارة خاصة بالبنية التحتية، أو محتاج أتمتة ممتازة لسيرفراتك.",
      labels: {
        socketInfo: "بيانات_اتصال_المهندس",
        location: "الموقع الجغرافي",
        availability: "حالة الإتاحة والعمل",
        email: "البريد الإلكتروني المباشر",
        apiEnvelope: "أرسل_رسالة_حمولة_بيانات",
        name: "اسمك الكريم",
        senderEmail: "بريدك الإلكتروني *",
        subject: "موضوع الرسالة",
        message: "تفاصيل وحمولة الرسالة *",
        submit: "أرسل_حزمة_البيانات",
        submitting: "جاري_الإرسال..."
      }
    },
    footer: {
      desc: "مهندس سحابي جونيور • بصمم وببني بنية تحتية سحابية مأتمتة بالكامل بالمسطرة.",
      status: "كل_الأنظمة_تعمل_بأقصى_كفاءة"
    }
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_lang") as Language;
      return stored === "ar" || stored === "en" ? stored : "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", language);
    // Dynamically adjust root html direction attribute to support clean RTL
    const html = document.documentElement;
    html.setAttribute("lang", language);
    html.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    
    // Add font override to body depending on lang to look insanely beautiful
    if (language === "ar") {
      html.classList.add("ar-mode");
    } else {
      html.classList.remove("ar-mode");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English dictionary if subkey is missing
        let fallback = translations["en"];
        for (const fk of keys) {
          fallback = fallback?.[fk];
        }
        return fallback || key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
