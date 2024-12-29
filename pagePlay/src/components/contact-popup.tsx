"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Phone } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export function ContactPopup() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
      agreeToTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Contact Us</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">CONTACT US</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4 rounded-lg bg-[#e5eadd] p-6">
            <h3 className="text-xl font-semibold">We&apos;d Love To Hear From You!</h3>
            <p className="text-sm text-muted-foreground">Let&apos;s Get in Touch</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here"
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Not sure what you need? The team at Square Events will be happy to listen to
                you and suggest event ideas you hadn&apos;t considered.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:pageplay2025@gmail.com" className="text-sm hover:underline">
                  pageplay2025@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:+8801798158614" className="text-sm hover:underline">
                  Support: (+880) 179 815 8614
                </a>
              </div>
            </div>
            <div className="relative h-48 w-full">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Decorative illustration"
                className="absolute bottom-0 right-0 h-auto w-3/4"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

