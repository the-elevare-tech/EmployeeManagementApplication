import emailjs from "@emailjs/browser";

export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  contactTemplateId:
    process.env.NEXT_PUBLIC_CONTACT_TEMPLATE_ID ??
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
    "",
  careersTemplateId:
    process.env.NEXT_PUBLIC_CAREERS_TEMPLATE_ID ??
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
    "",
};

export function isEmailJsConfigured(): boolean {
  return Boolean(
    emailjsConfig.serviceId &&
      emailjsConfig.publicKey &&
      emailjsConfig.contactTemplateId
  );
}

export async function sendContactEmail(params: Record<string, string>) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured");
  }
  return emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.contactTemplateId,
    params,
    emailjsConfig.publicKey
  );
}

export async function sendCareersEmail(params: Record<string, string>) {
  if (!emailjsConfig.serviceId || !emailjsConfig.publicKey || !emailjsConfig.careersTemplateId) {
    throw new Error("EmailJS careers template is not configured");
  }
  return emailjs.send(
    emailjsConfig.serviceId,
    emailjsConfig.careersTemplateId,
    params,
    emailjsConfig.publicKey
  );
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
