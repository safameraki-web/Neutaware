import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Enquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function ContactForm() {
  const form = useForm<Enquiry>({
    defaultValues: { name: '', email: '', company: '', message: '' },
  });
  const [copyStatus, setCopyStatus] = useState<'copied' | 'manual' | null>(null);
  const [enquiryText, setEnquiryText] = useState('');

  async function copyEnquiry(values: Enquiry) {
    const text = [
      'Neutaware website enquiry',
      '',
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      ...(values.company.trim() ? [`Company: ${values.company.trim()}`] : []),
      '',
      'Message:',
      values.message.trim(),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setEnquiryText('');
    } catch {
      setEnquiryText(text);
      setCopyStatus('manual');
    }
  }

  return (
    <div className="contact-form-wrap">
      <div className="eyebrow text-blue">Online enquiry</div>
      <h3>Tell us what you have in mind.</h3>
      <p className="contact-form-notice" id="contact-delivery-status" role="status" data-testid="status-contact-delivery">
        Online sending is not available yet. You can prepare and copy your enquiry below, then paste it into an email to{' '}
        <a href="mailto:info@neutaware.com" data-testid="link-form-email">info@neutaware.com</a>. Nothing you enter is sent or saved by this site.
      </p>
      <Form {...form}>
        <form className="contact-form" onSubmit={form.handleSubmit(copyEnquiry)} onChange={() => setCopyStatus(null)} aria-describedby="contact-delivery-status" noValidate>
            <div className="contact-form-grid">
              <FormField control={form.control} name="name" rules={{ required: 'Please enter your name.' }} render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name <span aria-hidden="true">*</span></FormLabel>
                  <FormControl><Input {...field} autoComplete="name" placeholder="Your name" data-testid="input-contact-name" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" rules={{ required: 'Please enter your email.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email.' } }} render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email <span aria-hidden="true">*</span></FormLabel>
                  <FormControl><Input {...field} type="email" autoComplete="email" placeholder="name@company.com" data-testid="input-contact-work-email" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company <span className="contact-optional">(optional)</span></FormLabel>
                <FormControl><Input {...field} autoComplete="organization" placeholder="Your organization" data-testid="input-contact-company" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="message" rules={{ required: 'Please tell us how we can help.', minLength: { value: 10, message: 'Please add a little more detail.' } }} render={({ field }) => (
              <FormItem>
                <FormLabel>How can we help? <span aria-hidden="true">*</span></FormLabel>
                <FormControl><Textarea {...field} rows={5} placeholder="Tell us about your challenge or idea" data-testid="input-contact-message" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <button className="btn btn-blue contact-submit" type="submit" data-testid="button-copy-contact">Copy enquiry details</button>
            {copyStatus === 'copied' && <p className="contact-copy-status" role="status" data-testid="status-contact-copied">Copied. Paste these details into an email to info@neutaware.com. Your enquiry has not been sent.</p>}
            {copyStatus === 'manual' && <div className="contact-copy-status" role="status" data-testid="status-contact-manual"><p>Automatic copying is unavailable. Select and copy the details below, then paste them into an email to info@neutaware.com. Your enquiry has not been sent.</p><textarea aria-label="Enquiry details to copy" readOnly value={enquiryText} rows={8} onFocus={(event) => event.currentTarget.select()} data-testid="textarea-contact-copy"/></div>}
        </form>
      </Form>
    </div>
  );
}