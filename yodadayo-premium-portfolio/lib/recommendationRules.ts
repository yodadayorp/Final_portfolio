export const PLAN_DATA = {
    starter: {
        name: "The Blueprint",
        description: "Best for early-stage founders or startups who want a clean brand launch with an online presence.",
        tags: [
            "starter", "basic", "beginner", "early stage", "launch", "starting out", "new business", "new brand", "brand launch",
            "first website", "simple website", "single page", "landing page", "one page site", "clean design", "basic logo",
            "primary logo", "core color palette", "typography system", "mini guideline", "small brand kit", "brand basics",
            "whatsapp button", "contact form", "cta tracking", "performance basics", "basic seo", "seo setup", "metadata",
            "schema", "startup site", "minimal design", "launch page", "business launch", "portfolio launch"
        ]
    },
    growth: {
        name: "The Authority",
        description: "Best for small businesses that need a multi-page website, brand identity, and foundational SEO.",
        tags: [
            "growth", "authority", "small business", "scaling", "expand", "professional", "rebrand", "multi page", "multi-page",
            "company website", "5 pages", "service pages", "about page", "contact page", "blog page", "integrated backend",
            "cms", "content management", "full brand identity", "brand guidelines", "color system", "typography",
            "brand usage", "imagery style", "keyword mapping", "seo foundation", "1 month content calendar",
            "content templates", "social templates", "brand upgrade", "business site", "website redesign",
            "enhance brand", "marketing ready", "visual identity", "brand consistency"
        ]
    },
    premium: {
        name: "The Empire",
        description: "Best for growing or established businesses that need a complete brand system, integrated website, automation, and ad setup.",
        tags: [
            "premium", "empire", "advanced", "scale", "complete system", "full digital setup", "crm integration",
            "analytics dashboard", "marketing system", "automation tools", "automation integration", "advanced integrations",
            "meta ads", "facebook ads", "instagram ads", "pixel setup", "conversion tracking", "ad setup", "event configuration",
            "ad strategy", "creative direction", "ad consulting", "premium brand system", "custom icons", "icon set",
            "full website setup", "on-page seo", "seo optimization", "seo report", "growth content strategy", "pillar content",
            "monthly themes", "custom social templates", "marketing ready website", "business expansion", "large scale",
            "scaling business", "complete branding", "ads support", "marketing automation"
        ]
    }
};

export const detectPriceQuery = (text: string): boolean => {
    const priceWords = ["price", "cost", "charge", "fee", "budget", "how much"];
    return priceWords.some(word => text.toLowerCase().includes(word));
};

export const getAIRecommendation = (userInput: string): string => {
    const input = userInput.trim().toLowerCase();

    if (!input) {
        return "Please describe your business needs so I can recommend a plan.";
    }

    if (detectPriceQuery(input)) {
        return "You need to schedule a call with the boss for the price. You'll find a button just above for scheduling the meet.";
    }

    // Scoring Logic
    let bestPlanKey: 'starter' | 'growth' | 'premium' | null = null;
    let maxMatches = 0;
    const allMatchedTags: string[] = [];

    Object.entries(PLAN_DATA).forEach(([key, plan]) => {
        let matches = 0;
        plan.tags.forEach(tag => {
            if (input.includes(tag.toLowerCase())) {
                matches++;
                if (!allMatchedTags.includes(tag)) allMatchedTags.push(tag);
            }
        });

        // Weigh premium higher if matches are equal, then growth, then starter
        if (matches > maxMatches || (matches === maxMatches && matches > 0)) {
            maxMatches = matches;
            bestPlanKey = key as 'starter' | 'growth' | 'premium';
        }
    });

    if (!bestPlanKey || maxMatches === 0) {
        return "No exact plan matches your specific keywords. We recommend browsing our tiered models above or choosing 'Customize a Plan' to build a bespoke package.";
    }

    const recommended = PLAN_DATA[bestPlanKey as keyof typeof PLAN_DATA];

    let response = `Based on your specific needs, we recommend:\n\n`;
    response += `🏆 **${recommended.name}**\n`;
    response += `${recommended.description}\n\n`;

    if (allMatchedTags.length > 0) {
        response += `We detected these key requirements in your request:\n`;
        // Show up to 5 relevant tags
        allMatchedTags.slice(0, 5).forEach(tag => {
            response += `✅ ${tag.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}\n`;
        });
    }

    response += "\nWant to discuss next steps? Tap 'Schedule a Meet'.";
    return response;
};
