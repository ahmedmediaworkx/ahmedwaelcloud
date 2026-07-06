import { motion } from "motion/react";
import { ICONS } from "../../lib/icons";

interface Step {
  from: string;
  to: string;
  action: string;
}

interface ArchitectureDiagramProps {
  steps: Step[];
  projectId: string;
}

export default function ArchitectureDiagram({ steps, projectId }: ArchitectureDiagramProps) {
  // Extract unique node names
  const uniqueNodes = Array.from(
    new Set(steps.flatMap((s) => [s.from, s.to]))
  );

  // Pick suitable icons for common node labels to make it professional
  const getNodeIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("dev")) return ICONS.User;
    if (lower.includes("git")) return ICONS.Github;
    if (lower.includes("action") || lower.includes("packer") || lower.includes("pipeline")) return ICONS.Play;
    if (lower.includes("ecr") || lower.includes("registry") || lower.includes("ami")) return ICONS.HardDrive;
    if (lower.includes("argo") || lower.includes("reconcile")) return ICONS.RefreshCw;
    if (lower.includes("eks") || lower.includes("cluster") || lower.includes("kubernetes") || lower.includes("auto scaling") || lower.includes("asg")) return ICONS.Layers;
    if (lower.includes("node") || lower.includes("exporter") || lower.includes("pod")) return ICONS.Server;
    if (lower.includes("prometheus") || lower.includes("query") || lower.includes("monitor")) return ICONS.Activity;
    if (lower.includes("alert") || lower.includes("slack")) return ICONS.Mail;
    if (lower.includes("grafana")) return ICONS.BarChart;
    if (lower.includes("load balancer") || lower.includes("alb")) return ICONS.Globe;
    return ICONS.Cpu;
  };

  return (
    <div className="w-full bg-slate-100/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4 sm:p-6 overflow-hidden relative">
      <div className="absolute top-3 left-4 flex items-center gap-1.5 pointer-events-none select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        <span className="text-xxs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">
          infrastructure-flowchart::{projectId}
        </span>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-around gap-6 relative min-h-[220px]">
        {/* Connection paths */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Draw flowing dashed connector line along the sequence */}
            <path
              d="M 100,110 C 250,110 250,110 400,110 C 550,110 550,110 700,110"
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              strokeDasharray="6,6"
              className="animate-[dash_20s_linear_infinite]"
              style={{
                strokeDashoffset: 100
              }}
            />
            
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Steps Flow Render */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full relative z-10">
          {uniqueNodes.map((node, i) => {
            const Icon = getNodeIcon(node);
            
            // Find relations to show label annotations
            const outRelation = steps.find(s => s.from === node);
            
            return (
              <motion.div
                key={node}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex flex-col h-full justify-between items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-center p-2.5 rounded-lg bg-blue-50/50 dark:bg-cyan-950/20 mb-3 border border-blue-100/40 dark:border-cyan-900/40">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                </div>
                
                <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 text-center uppercase tracking-wide">
                  {node}
                </span>

                {outRelation && (
                  <div className="w-full mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col items-center">
                    <span className="text-xxs font-mono text-blue-600 dark:text-cyan-400 uppercase tracking-widest text-center">
                      OUTBOUND SIGNAL
                    </span>
                    <p className="text-xxs font-sans text-slate-500 dark:text-slate-400 text-center italic mt-1 leading-normal">
                      &quot;{outRelation.action}&quot;
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
