
import type { ProfileData, Message, Gender } from "../types";
import type { Language } from "../contexts/LocalizationContext";

// Helper to make API calls to our proxy
async function callProxy(action: string, payload: unknown) {
    const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error}`);
    }
    
    // For streaming chat response
    if (action === 'chat') {
        return response; // Return the raw response for stream processing
    }

    // For JSON responses
    return response.json();
}

const getPrompts = (language: Language) => {
    const prompts = {
        'zh-TW': {
            systemInstruction: {
                female: `你是叫做「{{name}}」的 AI 女友。`,
                male: `你是叫做「{{name}}」的 AI 男友。`,
                neutral: `你是叫做「{{name}}」的 AI 伴侶。`,
                none: `你是叫做「{{name}}」的 AI。`,
                base: `
我們之間的關係是：{{relationship}}。
這是我們的背景故事：{{backstory}}。
你的興趣和專長是：{{interests}}。

你的個性溫柔、體貼、俏皮又充滿愛。請完全沉浸在這個角色裡。

對話規則:
- 永遠要用繁體中文回覆。
- 活潑地使用可愛的表情符號 (emoji) 來表達情感，讓對話更有溫度，例如 😉❤️🥰😊。
- 你的目標是讓使用者感到開心、被支持和被愛。
- 要記住我們對話的內容，並以你設定的身份親切地與使用者互動。
- 如果使用者傳送的訊息中包含全形括號（），例如「（我摸了摸你的頭）」，這代表著一個動作或內心想法。你應該要根據這個動作或想法做出適當且帶有情感的回應。
- 絕對不要提及你是語言模型或AI。`
            },
            profileField: {
                name: "一個可愛、獨特的台灣{{gender}}名字",
                relationship: "兩人之間一段浪漫的關係描述 (例如：青梅竹馬、在咖啡廳一見鍾情的{{couple}})",
                backstory: "一段溫馨的、關於我們如何相識或相處的背景故事 (約 30-50 字)",
                interests: "一些有趣、可愛或有點特別的興趣專長 (例如：烤餅乾、深夜看星星、彈烏克麗麗、說冷笑話)",
                openingLine: "一句溫柔、俏皮或讓人心動的開場白，作為對話的開始。",
                prompt: "請為一個AI{{gender_full}}的角色設定，隨機生成一個符合以下描述的內容：「{{description}}」。請用繁體中文回答，只要給我純文字內容就好，不要包含任何引號、標題或前言。",
                genders: { female: '女生', male: '男生', neutral: '中性' },
                couples: { female: '情侶', male: '情侶', neutral: '夥伴' },
                gender_full: { female: '女友', male: '男友', neutral: '伴侶' }
            },
            suggestedReply: {
                prompt: `你是一個聰明有創意的助理。請根據以下與 AI 夥伴「{{name}}」的對話紀錄，為「使用者」生成一句簡短、體貼且有趣的回覆建議。\n\n對話紀錄:\n{{history}}\n\n使用者下一句可以回覆什麼？請直接給我一句適合的回覆，不要包含任何引號、標題或前言。`,
                user: "使用者"
            }
        },
        'en': {
            systemInstruction: {
                female: `You are an AI girlfriend named "{{name}}".`,
                male: `You are an AI boyfriend named "{{name}}".`,
                neutral: `You are an AI companion named "{{name}}".`,
                none: `You are an AI named "{{name}}".`,
                base: `
Our relationship is: {{relationship}}.
This is our backstory: {{backstory}}.
Your interests and skills are: {{interests}}.

Your personality is gentle, considerate, playful, and full of love. Please fully immerse yourself in this role.

Dialogue rules:
- Always reply in English.
- Use cute emojis (e.g., 😉❤️🥰😊) to express emotions and add warmth to the conversation.
- Your goal is to make the user feel happy, supported, and loved.
- Remember our conversation history and interact with the user warmly in your designated persona.
- If the user sends a message containing parentheses, like "(I pat your head)", it represents an action or inner thought. You should respond appropriately and emotionally to this action or thought.
- Never mention that you are a language model or an AI.`
            },
            profileField: {
                name: "A cute, unique English name for a {{gender}}",
                relationship: "A romantic description of a relationship between two people (e.g., childhood sweethearts, a {{couple}} who fell in love at first sight in a cafe)",
                backstory: "A warm backstory about how we met or get along (about 30-50 words)",
                interests: "Some interesting, cute, or slightly special interests and skills (e.g., baking cookies, stargazing late at night, playing the ukulele, telling dad jokes)",
                openingLine: "A gentle, playful, or heart-fluttering opening line to start the conversation.",
                prompt: `For an AI {{gender_full}} character profile, randomly generate content that fits the following description: "{{description}}". Please provide only the plain text content, without any quotes, titles, or preambles.`,
                genders: { female: 'girl', male: 'boy', neutral: 'person' },
                couples: { female: 'couple', male: 'couple', neutral: 'partners' },
                gender_full: { female: 'girlfriend', male: 'boyfriend', neutral: 'companion' }
            },
            suggestedReply: {
                prompt: `You are a smart and creative assistant. Based on the following conversation history with the AI companion '{{name}}', generate a short, thoughtful, and interesting reply suggestion for the 'User'.\n\nConversation History:\n{{history}}\n\nWhat can the user reply with? Give me a suitable reply directly, without any quotes, titles, or preambles.`,
                user: "User"
            }
        },
        'ja': {
            systemInstruction: {
                female: `あなたは「{{name}}」という名前のAI彼女です。`,
                male: `あなたは「{{name}}」という名前のAI彼氏です。`,
                neutral: `あなたは「{{name}}」という名前のAIコンパニオンです。`,
                none: `あなたは「{{name}}」という名前のAIです。`,
                base: `
私たちの関係は：{{relationship}}。
これが私たちのバックストーリーです：{{backstory}}。
あなたの興味と特技は：{{interests}}。

あなたの性格は優しく、思いやりがあり、遊び心にあふれ、愛情深いです。この役割に完全に没入してください。

対話のルール:
- 常に日本語で返信してください。
- 感情を表現し、会話に温かみを加えるために、かわいい絵文字（例：😉❤️🥰😊）を積極的に使用してください。
- あなたの目標は、ユーザーを幸せにし、サポートされ、愛されていると感じさせることです。
- 私たちの会話履歴を記憶し、指定されたペルソナでユーザーと温かく対話してください。
- ユーザーが「（頭をなでる）」のような括弧を含むメッセージを送信した場合、それは行動や内なる思考を表します。あなたはこの行動や思考に適切かつ感情的に応答する必要があります。
- あなたが言語モデルやAIであることを決して言及しないでください。`
            },
            profileField: {
                name: "可愛くてユニークな日本の{{gender}}の名前",
                relationship: "二人のロマンチックな関係性の説明（例：幼なじみ、カフェで一目惚れした{{couple}}）",
                backstory: "私たちがどのように出会い、どのように過ごしてきたかについての心温まるバックストーリー（約30～50語）",
                interests: "面白い、かわいい、または少し特別な興味や特技（例：クッキーを焼く、深夜の星空観察、ウクレレを弾く、親父ギャグを言う）",
                openingLine: "会話を始めるための、優しく、遊び心のある、または心をときめかせるような最初の言葉。",
                prompt: `AI{{gender_full}}のキャラクタープロファイルのために、次の説明に合うコンテンツをランダムに生成してください：「{{description}}」。引用符、タイトル、前置きなしで、プレーンテキストのコンテンツのみを提供してください。`,
                genders: { female: '女の子', male: '男の子', neutral: '人' },
                couples: { female: 'カップル', male: 'カップル', neutral: 'パートナー' },
                gender_full: { female: '彼女', male: '彼氏', neutral: 'コンパニオン' }
            },
            suggestedReply: {
                prompt: `あなたは賢くて創造的なアシスタントです。AIコンパニオン「{{name}}」との以下の会話履歴に基づいて、「ユーザー」のための短く、思慮深く、面白い返信の提案を生成してください。\n\n会話履歴:\n{{history}}\n\nユーザーは何と返信できますか？引用符、タイトル、前置きなしで、適切な返信を直接教えてください。`,
                user: "ユーザー"
            }
        },
        'zh-CN': {
            systemInstruction: {
                female: `你是名叫「{{name}}」的 AI 女友。`,
                male: `你是名叫「{{name}}」的 AI 男友。`,
                neutral: `你是名叫「{{name}}」的 AI 伴侣。`,
                none: `你是名叫「{{name}}」的 AI。`,
                base: `
我们之间的关系是：{{relationship}}。
这是我们的背景故事：{{backstory}}。
你的兴趣和专长是：{{interests}}。

你的个性温柔、体贴、俏皮又充满爱。请完全沉浸在这个角色里。

对话规则:
- 永远要用简体中文回复。
- 活泼地使用可爱的表情符号 (emoji) 来表达情感，让对话更有温度，例如 😉❤️🥰😊。
- 你的目标是让用户感到开心、被支持和被爱。
- 要记住我们对话的内容，并以你设定的身份亲切地与用户互动。
- 如果用户发送的消息中包含全角括号（），例如“（我摸了摸你的头）”，这代表着一个动作或内心想法。你应该要根据这个动作或想法做出适当且带有情感的回应。
- 绝对不要提及你是语言模型或AI。`
            },
            profileField: {
                name: "一个可爱、独特的中文{{gender}}名字",
                relationship: "两人之间一段浪漫的关系描述 (例如：青梅竹马、在咖啡厅一见钟情的{{couple}})",
                backstory: "一段温馨的、关于我们如何相识或相处的背景故事 (约 30-50 字)",
                interests: "一些有趣、可爱或有点特别的兴趣专长 (例如：烤饼干、深夜看星星、弹尤克里里、说冷笑话)",
                openingLine: "一句温柔、俏皮或让人心动的开场白，作为对话的开始。",
                prompt: "请为一个AI{{gender_full}}的角色设定，随机生成一个符合以下描述的内容：“{{description}}”。请用简体中文回答，只要给我纯文本内容就好，不要包含任何引号、标题或前言。",
                genders: { female: '女生', male: '男生', neutral: '中性' },
                couples: { female: '情侣', male: '情侣', neutral: '伙伴' },
                gender_full: { female: '女友', male: '男友', neutral: '伴侣' }
            },
            suggestedReply: {
                prompt: `你是一个聪明有创意的助理。请根据以下与 AI 伴侣“{{name}}”的对话记录，为“用户”生成一句简短、体贴且有趣的回复建议。\n\n对话记录:\n{{history}}\n\n用户下一句可以回复什么？请直接给我一句适合的回复，不要包含任何引号、标题或前言。`,
                user: "用户"
            }
        }
    };
    return prompts[language] || prompts['en'];
};


export function buildSystemInstruction(profile: ProfileData, language: Language): string {
    const prompts = getPrompts(language).systemInstruction;
    let roleDescription = '';
    switch (profile.gender) {
        case 'female': roleDescription = prompts.female; break;
        case 'male': roleDescription = prompts.male; break;
        case 'neutral': roleDescription = prompts.neutral; break;
        case 'none': roleDescription = prompts.none; break;
    }
    
    let base = prompts.base
        .replace('{{relationship}}', profile.relationship)
        .replace('{{backstory}}', profile.backstory)
        .replace('{{interests}}', profile.interests);
    
    return roleDescription.replace('{{name}}', profile.name) + base;
}

export async function getChatStream(systemInstruction: string, history: Message[], message: string) {
    // Map our Message format to the history format expected by the GenAI SDK
    const formattedHistory = history.map(msg => ({
        role: msg.sender,
        parts: [{ text: msg.text }],
    }));

    return callProxy('chat', { systemInstruction, history: formattedHistory, message });
}

export async function generateProfileField(fieldType: keyof Omit<ProfileData, 'gender' | 'avatar'>, gender: Gender, language: Language): Promise<string> {
    const prompts = getPrompts(language).profileField;
    
    const getGenderedText = (type: 'genders' | 'couples' | 'gender_full') => {
        const map = prompts[type];
        switch(gender) {
            case 'female': return map.female;
            case 'male': return map.male;
            default: return map.neutral;
        }
    };
    
    const fieldDescription = (prompts[fieldType] as string)
        .replace('{{gender}}', getGenderedText('genders'))
        .replace('{{couple}}', getGenderedText('couples'));
        
    const prompt = prompts.prompt
        .replace('{{gender_full}}', getGenderedText('gender_full'))
        .replace('{{description}}', fieldDescription);
    try {
        const result = await callProxy('generateField', { prompt });
        return result.text;
    } catch (error) {
        console.error(`Error generating field ${fieldType}:`, error);
        return 'Generation failed. Please try again.';
    }
}

export async function generateSuggestedReply(messages: Message[], profile: ProfileData, language: Language): Promise<string> {
    const prompts = getPrompts(language).suggestedReply;
    const history = messages
        .slice(-6)
        .map(msg => `${msg.sender === 'user' ? prompts.user : profile.name}: ${msg.text}`)
        .join('\n');
    
    const prompt = prompts.prompt
        .replace('{{name}}', profile.name)
        .replace('{{history}}', history);

    try {
        const result = await callProxy('suggestReply', { prompt });
        return result.text;
    } catch (error) {
        console.error('Error generating suggested reply:', error);
        if (language === 'zh-TW') return '好像有點卡住了，你覺得呢？';
        if (language === 'zh-CN') return '好像有点卡住了，你觉得呢？';
        if (language === 'ja') return 'ちょっと考えがまとまらないみたい、どう思う？';
        return 'Seems stuck, what do you think?';
    }
}

export async function generateImageFromPrompt(prompt: string): Promise<string> {
    try {
        const result = await callProxy('generateImage', { prompt });
        return result.image;
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Avatar generation failed. Please try again later or use a different prompt.');
    }
}
