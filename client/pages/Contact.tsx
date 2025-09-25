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

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(["service", "consultation", "general"]),
  service: z.string().optional(),
  message: z.string().min(10),
});

export default function Contact() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { type: "service" },
  });

  const watchType = form.watch("type");

  const onSubmit = (values: z.infer<typeof schema>) => {
    try {
      const key = values.type === "consultation" ? "metrics:consultation" : values.type === "service" ? "metrics:service" : "metrics:general";
      const prev = Number(localStorage.getItem(key) || "0");
      localStorage.setItem(key, String(prev + 1));
    } catch {}
    toast.success("Thanks! We'll get back to you shortly.");
    console.log("Contact submission", values);
  };

  return (
    <section className="section">
      <h1 className="section-title">Contact & Quote</h1>
      <p className="section-subtitle">We respond within 1 business day.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            <SelectItem value="mv">Large Power & MV</SelectItem>
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
            Lagos, Nigeria • Abuja • Port Harcourt
          </div>
          <div className="mt-6 h-64 w-full rounded-lg bg-[url('https://tile.openstreetmap.org/5/16/16.png')] bg-cover bg-center" />
          <div className="mt-6 text-sm text-foreground/70">
            Phone: +234 000 000 0000
            <br />
            Email: info@jbranky.com
          </div>
        </div>
      </div>
    </section>
  );
}
