import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { saveSubmission } from "@/lib/submissions";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(["service", "consultation", "general"]),
  service: z.string().optional(),
  message: z.string().min(10),
});

import SectionReveal from "@/components/site/SectionReveal";

export default function Contact() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { type: "service" },
  });

  const watchType = form.watch("type");

  const onSubmit = (values: z.infer<typeof schema>) => {
    try {
      const key =
        values.type === "consultation"
          ? "metrics:consultation"
          : values.type === "service"
            ? "metrics:service"
            : "metrics:general";
      const prev = Number(localStorage.getItem(key) || "0");
      localStorage.setItem(key, String(prev + 1));
      saveSubmission({
        name: values.name,
        email: values.email,
        phone: values.phone,
        type: values.type,
        service: values.service,
        message: values.message,
      });
    } catch {}
    toast.success("Thanks! We'll get back to you shortly.");
  };

  return (
    <section className="section">
      <SectionReveal>
        <h1 className="section-title">Contact & Quote</h1>
        <p className="section-subtitle">We respond within 1 business day.</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 ..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inquiry type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="service">
                              Request Service
                            </SelectItem>
                            <SelectItem value="consultation">
                              Book Consultation
                            </SelectItem>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchType !== "general" && (
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hydropower">
                                Hydropower
                              </SelectItem>
                              <SelectItem value="mv">
                                Large Power & MV
                              </SelectItem>
                              <SelectItem value="sollatek">
                                Sollatek Protection
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Tell us about your project..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </form>
            </Form>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="font-display text-lg font-bold text-primary">
              Our Offices
            </div>
            <div className="mt-2 text-foreground/70 text-sm">
              Nairobi, Kenya • Mombasa • Kisumu
            </div>
            <div className="mt-6 h-64 w-full rounded-lg overflow-hidden">
              <iframe
                title="JBRANKY Kenya Map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31909.39486296024!2d36.802128!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d3d7d859bf%3A0x8c6f8f8b0b9e3bdf!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1710000000000"
              />
            </div>
            <div className="mt-6 text-sm text-foreground/70">
              Phone: +254 000 000 000
              <br />
              Email: info@jbranky.com
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
