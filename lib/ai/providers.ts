import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { groq } from '@ai-sdk/groq';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

import { anthropic } from '@ai-sdk/anthropic';
// import { fal } from "@ai-sdk/fal";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
    : customProvider({
      languageModels: {
        "chat-model": anthropic("claude-3-7-sonnet-20250219"), // Replace xai with anthropic
        "chat-model-reasoning": wrapLanguageModel({
          // model: groq("deepseek-r1-distill-llama-70b"),
          model: anthropic("claude-3-7-sonnet-20250219"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": anthropic("claude-3-5-haiku-20241022"),
        "artifact-model": anthropic("claude-3-5-haiku-20241022"),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
  // : customProvider({
  //     languageModels: {
  //       'chat-model': xai('grok-2-1212'),
  //       'chat-model-reasoning': wrapLanguageModel({
  //         model: groq('deepseek-r1-distill-llama-70b'),
  //         middleware: extractReasoningMiddleware({ tagName: 'think' }),
  //       }),
  //       'title-model': xai('grok-2-1212'),
  //       'artifact-model': xai('grok-2-1212'),
  //     },
  //     imageModels: {
  //       'small-model': xai.image('grok-2-image'),
  //     },
  //   });
