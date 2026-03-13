import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitAppointment } from "../hooks/useQueries";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const teamMembers = [
  {
    name: "Dr. Ashok Kumar Srivastava",
    degree: "BDS, MDS",
    designation: "Founder & Senior Dental Surgeon",
    specialization: "Implants & Oral Surgery",
    bio: "With 15+ years of clinical experience, Dr. Ashok Kumar Srivastava leads Dentocare Centre with a commitment to excellence and patient-first care. An expert in complex implant placements and oral surgical procedures.",
    image: null,
    initials: "AKS",
  },
  {
    name: "Dr. Ankit Shrivastava",
    degree: "BDS",
    designation: "Dental Surgeon",
    specialization: "Root Canal Treatment (RCT) & Endodontics",
    bio: "Dr. Ankit Shrivastava is a specialist in painless root canal treatments and endodontic procedures, using advanced rotary systems for precise, comfortable results.",
    image: "/assets/uploads/dento-11-7.webp",
    initials: "AS",
  },
  {
    name: "Dr. Priya Shrivastava",
    degree: "BDS",
    designation: "Dental Surgeon",
    specialization: "Orthodontics & Dental Aesthetics",
    bio: "Dr. Priya Shrivastava combines clinical precision with an artistic eye to deliver beautiful smiles through braces, aligners, and cosmetic dentistry treatments.",
    image: "/assets/uploads/dento10-5.webp",
    initials: "PS",
  },
];

const services = [
  {
    title: "Dental Implants",
    description:
      "Permanent tooth replacement with titanium implants. Look, feel and function like natural teeth.",
    image: "/assets/uploads/dento7-4.webp",
    imageAlt: "Sterilisation Equipment",
    icon: null,
    badge: "Most Popular",
  },
  {
    title: "Orthodontics & Braces",
    description:
      "Metal braces, ceramic braces & clear aligners to give you the perfect smile.",
    image: "/assets/uploads/dento6-10.webp",
    imageAlt: "Dental Procedure",
    icon: null,
    badge: null,
  },
  {
    title: "Root Canal Treatment",
    description:
      "Painless RCT to save infected or damaged teeth with advanced rotary endodontics.",
    image: "/assets/uploads/dento3-8.webp",
    imageAlt: "OPG Machine",
    icon: null,
    badge: "Painless",
  },
  {
    title: "Teeth Whitening",
    description:
      "Professional teeth whitening for a brighter, more confident smile.",
    image: "/assets/uploads/dento5-9.webp",
    imageAlt: "Reception & Waiting Area",
    icon: null,
    badge: null,
  },
  {
    title: "Dental Extractions",
    description: "Safe and gentle tooth extractions with minimal discomfort.",
    image: null,
    imageAlt: null,
    icon: "tooth",
    badge: null,
  },
  {
    title: "Scaling & Cleaning",
    description:
      "Professional deep cleaning to remove plaque, tartar and keep gums healthy.",
    image: null,
    imageAlt: null,
    icon: "sparkles",
    badge: null,
  },
];

const whyUs = [
  {
    icon: Award,
    title: "Experienced Specialists",
    description:
      "BDS/MDS qualified doctors with 10+ years of clinical experience in advanced dental procedures.",
  },
  {
    icon: Zap,
    title: "Advanced Technology",
    description:
      "Digital X-rays, rotary endodontics, modern sterilization equipment for best outcomes.",
  },
  {
    icon: Heart,
    title: "Painless Treatment",
    description:
      "Gentle techniques and proper anesthesia protocols for a completely pain-free experience.",
  },
  {
    icon: Shield,
    title: "Affordable Pricing",
    description:
      "Quality dental care at transparent, competitive prices. No hidden charges, ever.",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Rishikesh",
    text: "I had my dental implants done at Dentocare Centre and the results are amazing! The doctor is very professional and the staff is very friendly. I can eat and smile with full confidence now.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    location: "Dehradun",
    text: "Got my braces done here. The orthodontic treatment was very smooth and the results are excellent. The doctor monitored my progress carefully at every step. Highly recommend!",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    location: "Haridwar",
    text: "Had severe tooth pain and they performed root canal treatment perfectly. I was very scared initially but the doctor made it completely painless. Very professional team. Thank you Dentocare!",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Is root canal treatment painful?",
    answer:
      "With modern anesthesia and rotary endodontics, RCT at Dentocare Centre is virtually painless. Most patients report feeling minimal to no discomfort during the procedure.",
  },
  {
    question: "How long do dental implants last?",
    answer:
      "With proper care, dental implants can last a lifetime. They are the most permanent tooth replacement solution available and integrate with your jawbone for a natural feel.",
  },
  {
    question: "At what age can braces be done?",
    answer:
      "Braces can be done at any age, though the ideal age is between 12-18 when the jaw is still developing. Adults can also get braces or opt for clear aligners for a more discreet treatment.",
  },
  {
    question: "How many sittings does RCT take?",
    answer:
      "Typically 2-3 sittings depending on the complexity of the case. In some straightforward cases, it can be completed in a single sitting.",
  },
  {
    question: "What is the cost of dental implants?",
    answer:
      "The cost varies based on the type of implant, brand, and complexity of your case. Please contact us for a personalized treatment plan and transparent pricing with no hidden charges.",
  },
];

const galleryImages = [
  {
    src: "/assets/uploads/dento9-11.webp",
    alt: "Main Entrance",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento1-1.jpg",
    alt: "Entrance",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento10-5.webp",
    alt: "Dr. Priya Shrivastava treating a patient",
    doctorCaption: "Dr. Priya Shrivastava",
  },
  {
    src: "/assets/uploads/dento7-4.webp",
    alt: "Sterilisation Equipment",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento5-9.webp",
    alt: "Reception & Waiting Area",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento2-3.webp",
    alt: "Dental Chair & Equipment",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento8-2.webp",
    alt: "Treatment in Progress",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento4-6.webp",
    alt: "Teeth Examination",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento3-8.webp",
    alt: "OPG Machine",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento6-10.webp",
    alt: "Dental Procedure",
    doctorCaption: null,
  },
  {
    src: "/assets/uploads/dento-11-7.webp",
    alt: "Dr. Ankit Shrivastava in RCT",
    doctorCaption: "Dr. Ankit Shrivastava",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitAppointment = useSubmitAppointment();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.serviceType ||
      !formData.preferredDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitAppointment.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        message: "",
      });
      toast.success(
        "Appointment booked successfully! We will contact you soon.",
      );
    } catch {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/assets/generated/dentocare-logo-transparent.dim_200x200.png"
              alt="Dentocare Centre Logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <div className="font-display font-bold text-lg leading-tight text-primary">
                Dentocare Centre
              </div>
              <div className="text-xs text-muted-foreground leading-tight">
                Rishikesh, Uttarakhand
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919897236240"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+91 98972 36240</span>
            </a>
            <Button
              data-ocid="nav.book.primary_button"
              className="gradient-cta text-white border-0 hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection("#contact")}
            >
              Book Appointment
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-border overflow-hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="gradient-cta text-white border-0 mt-2"
                  onClick={() => scrollToSection("#contact")}
                >
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/uploads/dento9-11.webp')",
          }}
        />
        <div className="absolute inset-0 gradient-hero" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-1.5">
              ✦ Rishikesh's Premier Dental Clinic
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              Dentocare Centre
            </h1>
            <p className="text-xl md:text-2xl font-light mb-3 text-white/90">
              Rishikesh's Most Trusted Dental Clinic
            </p>
            <p className="text-base md:text-lg text-white/80 mb-10">
              Expert Implants &nbsp;|&nbsp; Orthodontics &nbsp;|&nbsp; Root
              Canal Treatment
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                data-ocid="hero.book.primary_button"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 py-6 rounded-full shadow-hero"
                onClick={() => scrollToSection("#contact")}
              >
                Book Appointment
              </Button>
              <Button
                data-ocid="hero.learn.secondary_button"
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-full backdrop-blur-sm"
                onClick={() => scrollToSection("#services")}
              >
                Learn More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { value: "10+", label: "Years Experience", icon: Award },
              { value: "5000+", label: "Happy Patients", icon: Users },
              { value: "100%", label: "Painless Treatment", icon: Heart },
              { value: "✓", label: "Affordable Pricing", icon: Shield },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="text-2xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              Our Services
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Dental Care
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From routine cleanings to complex implants, we provide complete
              dental solutions under one roof with the latest technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1"
              >
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {service.badge && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="h-48 gradient-cta flex items-center justify-center">
                    {service.icon === "tooth" ? (
                      <svg
                        aria-hidden="true"
                        className="h-20 w-20 text-white/60"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.5 2 5 5 5 9c0 2.5 1 4.5 1.5 6.5S7 19 7 21h2c0-1.5-.5-3.5-1-5.5S7 11.5 7 9c0-3 2.5-5 5-5s5 2 5 5c0 2.5-.5 4-.5 6.5S15.5 19 16 21h2c0-2-.5-3.5-1-5.5S16.5 11.5 16.5 9C16.5 5 15 2 12 2z" />
                      </svg>
                    ) : (
                      <Sparkles className="h-20 w-20 text-white/60" />
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => scrollToSection("#contact")}
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 gradient-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-hero">
                <img
                  src="/assets/uploads/dento10-5.webp"
                  alt="Dr. Priya Shrivastava treating a patient"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full gradient-cta flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">
                        Dr. Priya Shrivastava
                      </div>
                      <div className="text-sm text-muted-foreground">
                        BDS | Dental Surgeon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/20 -z-10" />
              <div className="absolute -top-6 -left-6 h-20 w-20 rounded-full bg-primary/10 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-4 bg-accent text-accent-foreground border-0">
                About Us
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Dentocare Centre
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Dentocare Centre is Rishikesh's premier dental clinic, dedicated
                to providing world-class dental care in a comfortable and
                welcoming environment. Led by Dr. Priya Shrivastava and Dr.
                Ankit Shrivastava, our team of experienced dental professionals
                uses the latest technology and techniques to ensure the best
                outcomes for our patients.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Founded by specialist dentists with over 10 years of combined
                experience, we are located conveniently in Rishikesh, serving
                patients from across Uttarakhand. Our clinic is equipped with
                state-of-the-art dental equipment to deliver precision and
                comfort in every procedure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "BDS/MDS qualified doctors",
                  "Digital X-rays & diagnostics",
                  "Sterilized instruments",
                  "Painless treatment protocols",
                  "Modern rotary endodontics",
                  "Affordable transparent pricing",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              Our Team
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Our Doctors
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our experienced and compassionate dental team is dedicated to
              delivering the best care for your smile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((doctor, i) => (
              <motion.div
                key={doctor.name}
                data-ocid={`team.item.${i + 1}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1 border border-border/40"
              >
                {/* Photo or Avatar */}
                <div className="relative h-64 overflow-hidden">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full gradient-cta flex items-center justify-center">
                      <div className="h-28 w-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center">
                        <span className="font-display font-bold text-4xl text-white">
                          {doctor.initials}
                        </span>
                      </div>
                    </div>
                  )}
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-1">
                    <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium">
                      {doctor.degree}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mt-2 mb-0.5">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-medium text-secondary mb-2">
                    {doctor.designation}
                  </p>
                  <div className="flex items-start gap-1.5 mb-4">
                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {doctor.specialization}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary border-0">
              Why Choose Us
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Why Patients Trust Dentocare
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We combine expertise, technology, and genuine care to deliver
              dental experiences that exceed expectations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="h-16 w-16 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              Gallery
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Clinic & Procedures
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 ? "md:col-span-2" : ""
                } aspect-video`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">
                    {img.alt}
                  </span>
                </div>
                {/* Permanent doctor name badge for doctor photos */}
                {img.doctorCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-3 py-2">
                    <span className="text-white text-xs font-semibold tracking-wide">
                      {img.doctorCaption}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 gradient-section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              Testimonials
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Patients Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card border border-border/50 relative"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      // biome-ignore lint/suspicious/noArrayIndexKey: static star rating
                      key={j}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-cta flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              FAQ
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                data-ocid={`faq.item.${i + 1}`}
                className="bg-card border border-border/50 rounded-2xl px-6 shadow-xs"
              >
                <AccordionTrigger className="font-semibold text-foreground hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact & Appointment */}
      <section id="contact" className="py-24 bg-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary border-0">
              Contact Us
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Appointment
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Ready for a healthier smile? Book an appointment today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-display text-2xl font-bold text-white">
                Get In Touch
              </h3>
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "177, Maniram Marg, Rishikesh",
                },
                { icon: Phone, label: "Phone", value: "+91 98972 36240" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@dentocarecentre.com",
                },
                {
                  icon: Clock,
                  label: "Timings",
                  value:
                    "Mon-Sat: 10:30 AM – 2:00 PM & 4:30 PM – 8:00 PM | Sunday: 10:30 AM – 1:00 PM",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl gradient-cta flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-white text-sm">{item.value}</div>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white/70 text-sm leading-relaxed">
                  📍 Conveniently located at 177, Maniram Marg, easily
                  accessible from Dehradun, Haridwar, and all parts of
                  Rishikesh. Ample parking available.
                </p>
              </div>
            </motion.div>

            {/* Appointment Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-hero"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-ocid="appointment.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      Appointment Booked!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you! We will call you shortly to confirm your
                      appointment.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="gradient-cta text-white border-0"
                    >
                      Book Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-5"
                  >
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">
                      Schedule Your Visit
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="appt-name"
                          className="text-sm font-medium"
                        >
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="appt-name"
                          data-ocid="appointment.name.input"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="appt-phone"
                          className="text-sm font-medium"
                        >
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="appt-phone"
                          data-ocid="appointment.phone.input"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Service Required{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(v) =>
                          setFormData({ ...formData, serviceType: v })
                        }
                      >
                        <SelectTrigger data-ocid="appointment.service.select">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dental Implants">
                            Dental Implants
                          </SelectItem>
                          <SelectItem value="Orthodontics/Braces">
                            Orthodontics / Braces
                          </SelectItem>
                          <SelectItem value="Root Canal Treatment">
                            Root Canal Treatment (RCT)
                          </SelectItem>
                          <SelectItem value="Teeth Whitening">
                            Teeth Whitening
                          </SelectItem>
                          <SelectItem value="Scaling & Cleaning">
                            Scaling & Cleaning
                          </SelectItem>
                          <SelectItem value="Extraction">
                            Dental Extraction
                          </SelectItem>
                          <SelectItem value="Other">
                            Other / General Consultation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="appt-date"
                        className="text-sm font-medium"
                      >
                        Preferred Date{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="appt-date"
                        data-ocid="appointment.date.input"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="appt-message"
                        className="text-sm font-medium"
                      >
                        Message{" "}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Textarea
                        id="appt-message"
                        data-ocid="appointment.message.textarea"
                        placeholder="Describe your concern or any specific requirements..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    {submitAppointment.isError && (
                      <div
                        data-ocid="appointment.error_state"
                        className="text-sm text-destructive bg-destructive/10 rounded-lg p-3"
                      >
                        Something went wrong. Please try again or call us at +91
                        98972 36240.
                      </div>
                    )}

                    <Button
                      type="submit"
                      data-ocid="appointment.submit.primary_button"
                      className="w-full gradient-cta text-white border-0 py-6 text-base font-semibold rounded-xl hover:opacity-90 transition-opacity"
                      disabled={submitAppointment.isPending}
                    >
                      {submitAppointment.isPending
                        ? "Booking..."
                        : "Book Appointment"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/generated/dentocare-logo-transparent.dim_200x200.png"
                  alt="Dentocare Centre"
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <div className="font-display font-bold text-lg text-primary">
                    Dentocare Centre
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Your Smile, Our Mission
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rishikesh's most trusted dental clinic providing world-class
                dental care with the latest technology and experienced
                specialists.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>177, Maniram Marg, Rishikesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a
                    href="tel:+919897236240"
                    className="hover:text-primary transition-colors"
                  >
                    +91 98972 36240
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a
                    href="mailto:info@dentocarecentre.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@dentocarecentre.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Dentocare Centre, Rishikesh. All
              Rights Reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
