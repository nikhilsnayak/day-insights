ALTER TABLE "dashboard" ADD COLUMN "createInsight" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "dashboard" ADD COLUMN "viewInsights" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "dashboard" ADD COLUMN "viewProfile" boolean DEFAULT true NOT NULL;