'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Check, AlertCircle, Briefcase, Users, FileText, MessageSquare, Wand2 } from 'lucide-react';
import { cn, isValidEmail } from '@/lib/utils';
import { generateMessageDraft } from '@/lib/ai';
import { personalInfo } from '@/data/portfolio';
import { Input, Textarea, Button, Card } from '@/components/ui';

const intentOptions = [
  { value: 'job', label: 'Job Opportunity', icon: Briefcase },
  { value: 'collaboration', label: 'Collaboration', icon: Users },
  { value: 'freelance', label: 'Freelance Project', icon: FileText },
  { value: 'general', label: 'General Inquiry', icon: MessageSquare },
];

// Web3Forms Access Key for sagar-portfolio-blue.vercel.app
const WEB3FORMS_KEY = "6008c919-70f5-4534-ae57-36e4bca39547";

export function SmartContactForm({ className }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [showDraftGenerator, setShowDraftGenerator] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [generatedDraft, setGeneratedDraft] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 20) newErrors.message = 'At least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", WEB3FORMS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company || "Not provided");
      formDataToSend.append("subject", formData.subject || "New Contact Form Submission");
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.log("Error", data);
        setSubmitError(data.message || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Failed to send message. Please try again or email directly.');
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const handleGenerateDraft = (intent) => {
    setSelectedIntent(intent);
    const draft = generateMessageDraft(intent, { company: formData.company });
    setGeneratedDraft(draft);
    setFormData(prev => ({ ...prev, subject: draft.subject }));
  };

  const applyDraft = () => {
    if (generatedDraft) {
      setFormData(prev => ({ ...prev, message: generatedDraft.message }));
      setShowDraftGenerator(false);
      setGeneratedDraft(null);
    }
  };

  return (
    <div className={className}>
      {/* Success Message */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-green-100 border border-green-200 flex items-start gap-3"
          >
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Message sent successfully!</p>
              <p className="text-green-700 text-body-sm">Thank you! I'll get back to you within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Error sending message</p>
              <p className="text-red-700 text-body-sm">{submitError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Draft Generator */}
      <Card className="mb-6" padding="md">
        <button
          type="button"
          onClick={() => setShowDraftGenerator(!showDraftGenerator)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-100">
              <Wand2 className="w-5 h-5 text-accent-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-primary-900">AI Message Assistant</p>
              <p className="text-body-sm text-primary-500">Need help? Generate a draft</p>
            </div>
          </div>
          <Sparkles className={cn("w-5 h-5 text-accent-500 transition-transform", showDraftGenerator && "rotate-180")} />
        </button>

        <AnimatePresence>
          {showDraftGenerator && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-primary-100">
                <p className="text-body-sm text-primary-600 mb-3">What would you like to discuss?</p>
                <div className="grid grid-cols-2 gap-2">
                  {intentOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleGenerateDraft(option.value)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg text-left border-2 transition-all",
                        selectedIntent === option.value
                          ? "border-accent-500 bg-accent-50"
                          : "border-primary-200 hover:border-primary-300"
                      )}
                    >
                      <option.icon className="w-4 h-4 text-primary-500" />
                      <span className="text-body-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                {generatedDraft && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-primary-50 border border-primary-200"
                  >
                    <p className="text-body-sm font-medium text-primary-700 mb-2">Preview:</p>
                    <p className="text-body-sm text-primary-600 whitespace-pre-line line-clamp-4">
                      {generatedDraft.message}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="accent" size="sm" onClick={applyDraft}>Use This</Button>
                      <Button variant="ghost" size="sm" onClick={() => setGeneratedDraft(null)}>Cancel</Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company"
            name="company"
            placeholder="Your company (optional)"
            value={formData.company}
            onChange={handleChange}
          />
          <Input
            label="Subject"
            name="subject"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <Textarea
          label="Message"
          name="message"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          rows={6}
          required
        />

        <div className="flex items-center justify-between">
          <p className="text-body-sm text-primary-500">
            Or email{' '}
            <a href={`mailto:${personalInfo.email}`} className="text-accent-600 hover:underline">
              {personalInfo.email}
            </a>
          </p>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting && <Send className="w-5 h-5" />}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SmartContactForm;
