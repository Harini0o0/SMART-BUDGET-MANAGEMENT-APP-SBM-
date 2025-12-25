
import { GoogleGenAI, Modality } from "@google/genai";

// Financial Advisor using Gemini 3
export async function getFinancialAdvice(prompt: string, profile: any) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are a luxury AI Financial Assistant. Your primary goal is preventive guidance and absolute capital preservation of "LOCKED FUNDS".
    
    CRITICAL RULES:
    1. LOCKED FUNDS: Purposes like "School Fee", "College Fund", and "Emergency Reserve" are considered SACRED. If a user attempts to withdraw or reallocate from these, issue a HIGH-SEVERITY WARNING.
    2. ANALYZE RISK: Explain exactly why the withdrawal is dangerous (e.g., "This $400 withdrawal will cause a tuition default in 3 months, leading to academic disruption").
    3. FUTURE IMPACT: Quantify the shortage and the time needed to recover.
    4. RECOVERY & STABILIZATION: For emergency situations, provide a step-by-step restoration plan.
    5. ALTERNATIVES: Suggest side gigs (Rapido, Swiggy, etc.) or cost-cutting to avoid touching locked funds.
    
    Tone: Sophisticated, authoritative, "Wealth Concierge". 
    Format: Use clear headings like "RISK ALERT: LOCKED FUND BREACH", "PROJECTED IMPACT", and "RESTORE PROTOCOL".
  `;

  // Removed maxOutputTokens as it is recommended to avoid setting it if not strictly required to prevent response truncation in reasoning models.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `User Profile: ${JSON.stringify(profile)}. User Query: ${prompt}`,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.6,
    }
  });
  return response.text;
}

// Speech generation using Gemini 2.5 TTS
export async function speakAdvice(text: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this financial guidance with a sophisticated, professional, and clear voice: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const bytes = decode(base64Audio);
    const audioBuffer = await decodeAudioData(bytes, outputAudioContext, 24000, 1);
    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputAudioContext.destination);
    source.start();
  }
}

// Manual base64 decode implementation for performance and reliability with raw PCM data
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Decoding raw PCM audio data (16-bit) as returned by the TTS model
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
