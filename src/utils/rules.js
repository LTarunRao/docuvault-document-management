import { messages } from "@/constants/messages"
export const rules = {
    required: (v) => !!v || messages.RULES_MESSAGE.REQUIRED_FIELD,
    mobile: (v) => /^[6-9]\d{9}$/.test(v) || messages.RULES_MESSAGE.INVAILD_MOBILE_NO,
  }