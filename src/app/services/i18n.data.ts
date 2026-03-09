export interface Translations {
  [key: string]: string;
}

export const EN: Translations = {
  // Navbar
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.skills': 'Skills',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.game': 'Game',
  'nav.language': '中文',

  // Hero
  'hero.greeting': 'Hello, I\'m',
  'hero.name': 'Savi',
  'hero.title': 'AI Engineer',
  'hero.subtitle': 'Deploying & Optimizing Large Language Models on GPU Infrastructure',
  'hero.cta': 'View My Work',
  'hero.contact': 'Get In Touch',

  // About
  'about.title': 'About Me',
  'about.p1': 'I am an AI Engineer specializing in deploying and optimizing large language models on GPU infrastructure. My work focuses on building efficient, scalable inference pipelines that bring cutting-edge AI capabilities to production.',
  'about.p2': 'With deep expertise in vLLM, vLLM-Ascend, DeepSpeed, and LLaMA-Factory, I bridge the gap between research breakthroughs and real-world deployment. I nourish AI systems from prototype to production — tuning, optimizing, and scaling them to serve millions.',
  'about.p3': 'I thrive on pushing the boundaries of what\'s possible with GPU computing, constantly exploring new techniques for model parallelism, quantization, and inference optimization.',
  'about.highlight1.value': '50+',
  'about.highlight1.label': 'Models Deployed',
  'about.highlight2.value': '10x',
  'about.highlight2.label': 'Inference Speedup',
  'about.highlight3.value': '99.9%',
  'about.highlight3.label': 'Uptime SLA',

  // Skills
  'skills.title': 'Technical Arsenal',
  'skills.subtitle': 'Tools and frameworks I use to deploy, optimize, and scale AI systems',
  'skills.cat.inference': 'Inference Engines',
  'skills.cat.training': 'Training & Fine-tuning',
  'skills.cat.gpu': 'GPU & Infrastructure',
  'skills.cat.mlops': 'MLOps & Deployment',
  'skills.cat.languages': 'Languages & Frameworks',
  'skills.cat.models': 'Model Architectures',

  // Projects
  'projects.title': 'Featured Projects',
  'projects.subtitle': 'Key projects showcasing LLM deployment and GPU optimization',

  'projects.p1.title': 'High-Throughput LLM Serving Platform',
  'projects.p1.desc': 'Built a production-grade serving platform using vLLM with continuous batching, achieving 10x throughput improvement over naive inference. Supports multi-model routing with automatic load balancing across GPU clusters.',
  'projects.p1.tech': 'vLLM, CUDA, Kubernetes, Triton',

  'projects.p2.title': 'Ascend NPU Model Adaptation',
  'projects.p2.desc': 'Ported and optimized LLM inference pipelines to Huawei Ascend NPUs using vLLM-Ascend. Achieved comparable performance to NVIDIA GPUs while enabling deployment on domestic hardware infrastructure.',
  'projects.p2.tech': 'vLLM-Ascend, CANN, Ascend 910B',

  'projects.p3.title': 'Distributed Fine-tuning Pipeline',
  'projects.p3.desc': 'Designed a scalable fine-tuning pipeline using DeepSpeed ZeRO-3 and LLaMA-Factory, enabling efficient training of 70B+ parameter models across multi-node GPU clusters with automated hyperparameter optimization.',
  'projects.p3.tech': 'DeepSpeed, LLaMA-Factory, FSDP',

  'projects.p4.title': 'Real-time AI Inference Gateway',
  'projects.p4.desc': 'Architected a low-latency inference gateway with dynamic batching, KV-cache optimization, and speculative decoding. Reduced p99 latency by 60% while maintaining throughput under production load.',
  'projects.p4.tech': 'vLLM, Ray Serve, PagedAttention',

  'projects.p5.title': 'Model Compression Toolkit',
  'projects.p5.desc': 'Developed an automated quantization and pruning toolkit that compresses LLMs to 4-bit precision with minimal quality loss. Enables deployment of 70B models on single-GPU setups.',
  'projects.p5.tech': 'GPTQ, AWQ, bitsandbytes, ONNX',

  'projects.p6.title': 'GPU Cluster Monitoring Dashboard',
  'projects.p6.desc': 'Built a comprehensive monitoring solution for GPU clusters tracking utilization, memory, thermal throttling, and inference metrics. Integrated alerting for proactive capacity management.',
  'projects.p6.tech': 'Prometheus, Grafana, DCGM, Python',

  // Contact
  'contact.title': 'Get In Touch',
  'contact.subtitle': 'Interested in collaborating on AI infrastructure? Let\'s connect.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.send': 'Send Message',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.email.label': 'Email',

  // Footer
  'footer.rights': 'All rights reserved.',
  'footer.built': 'Built with Angular & Material Design',
};

export const ZH: Translations = {
  // Navbar
  'nav.home': '首页',
  'nav.about': '关于',
  'nav.skills': '技能',
  'nav.projects': '项目',
  'nav.contact': '联系',
  'nav.game': '游戏',
  'nav.language': 'EN',

  // Hero
  'hero.greeting': '你好，我是',
  'hero.name': 'Savi',
  'hero.title': 'AI 工程师',
  'hero.subtitle': '在GPU基础设施上部署和优化大语言模型',
  'hero.cta': '查看作品',
  'hero.contact': '联系我',

  // About
  'about.title': '关于我',
  'about.p1': '我是一名AI工程师，专注于在GPU基础设施上部署和优化大语言模型。我的工作重点是构建高效、可扩展的推理流水线，将前沿的AI能力带入生产环境。',
  'about.p2': '凭借在vLLM、vLLM-Ascend、DeepSpeed和LLaMA-Factory方面的深厚专业知识，我打通了从研究突破到实际部署的桥梁。我从原型到生产全程培育AI系统——调优、优化并扩展它们以服务数百万用户。',
  'about.p3': '我热衷于突破GPU计算的极限，不断探索模型并行、量化和推理优化的新技术。',
  'about.highlight1.value': '50+',
  'about.highlight1.label': '已部署模型',
  'about.highlight2.value': '10x',
  'about.highlight2.label': '推理加速',
  'about.highlight3.value': '99.9%',
  'about.highlight3.label': '可用性SLA',

  // Skills
  'skills.title': '技术栈',
  'skills.subtitle': '我用来部署、优化和扩展AI系统的工具和框架',
  'skills.cat.inference': '推理引擎',
  'skills.cat.training': '训练与微调',
  'skills.cat.gpu': 'GPU与基础设施',
  'skills.cat.mlops': 'MLOps与部署',
  'skills.cat.languages': '编程语言与框架',
  'skills.cat.models': '模型架构',

  // Projects
  'projects.title': '精选项目',
  'projects.subtitle': '展示LLM部署和GPU优化的核心项目',

  'projects.p1.title': '高吞吐LLM服务平台',
  'projects.p1.desc': '使用vLLM构建了生产级服务平台，采用连续批处理技术，推理吞吐量提升10倍。支持多模型路由，在GPU集群间自动负载均衡。',
  'projects.p1.tech': 'vLLM, CUDA, Kubernetes, Triton',

  'projects.p2.title': '昇腾NPU模型适配',
  'projects.p2.desc': '使用vLLM-Ascend将LLM推理流水线移植并优化到华为昇腾NPU。在国产硬件基础设施上实现了与NVIDIA GPU相当的性能。',
  'projects.p2.tech': 'vLLM-Ascend, CANN, Ascend 910B',

  'projects.p3.title': '分布式微调流水线',
  'projects.p3.desc': '使用DeepSpeed ZeRO-3和LLaMA-Factory设计了可扩展的微调流水线，支持在多节点GPU集群上高效训练700亿+参数模型，并自动优化超参数。',
  'projects.p3.tech': 'DeepSpeed, LLaMA-Factory, FSDP',

  'projects.p4.title': '实时AI推理网关',
  'projects.p4.desc': '架构了低延迟推理网关，具备动态批处理、KV缓存优化和推测解码功能。在保持生产负载吞吐量的同时，将p99延迟降低60%。',
  'projects.p4.tech': 'vLLM, Ray Serve, PagedAttention',

  'projects.p5.title': '模型压缩工具包',
  'projects.p5.desc': '开发了自动化量化和剪枝工具包，将LLM压缩至4位精度，质量损失极小。支持在单GPU上部署700亿参数模型。',
  'projects.p5.tech': 'GPTQ, AWQ, bitsandbytes, ONNX',

  'projects.p6.title': 'GPU集群监控仪表盘',
  'projects.p6.desc': '构建了全面的GPU集群监控解决方案，跟踪利用率、显存、温度降频和推理指标。集成告警功能，实现主动容量管理。',
  'projects.p6.tech': 'Prometheus, Grafana, DCGM, Python',

  // Contact
  'contact.title': '联系我',
  'contact.subtitle': '对AI基础设施合作感兴趣？让我们建立联系。',
  'contact.name': '姓名',
  'contact.email': '邮箱',
  'contact.message': '留言',
  'contact.send': '发送消息',
  'contact.github': 'GitHub',
  'contact.linkedin': 'LinkedIn',
  'contact.email.label': '邮箱',

  // Footer
  'footer.rights': '保留所有权利。',
  'footer.built': '使用 Angular 和 Material Design 构建',
};
