export const runtime = "edge";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Upload,
    FileText,
    Image,
    FileSpreadsheet,
    Shield,
    Zap,
    Globe,
    Check,
    Cloud,
    Lock,
    Users,
    ArrowRight,
    Play,
    Menu,
    X
} from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
    const user = await currentUser()
    if(user){
        redirect("/dashboard/files")
    }
    const fileTypes = [
        {
            icon: FileSpreadsheet,
            name: "CSV Files",
            description: "Spreadsheets and data tables",
            color: "text-green-500",
            bgColor: "bg-green-50",
        },
        {
            icon: FileText,
            name: "PDF Documents",
            description: "Reports and documentation",
            color: "text-red-500",
            bgColor: "bg-red-50",
        },
        {
            icon: Image,
            name: "Images",
            description: "Photos and graphics",
            color: "text-purple-500",
            bgColor: "bg-purple-50",
        },
    ];

    const features = [
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Bank-grade encryption with compliance standards including SOC 2 and GDPR.",
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Upload and access files instantly with our global CDN infrastructure.",
        },
        {
            icon: Globe,
            title: "Global Access",
            description: "Access your files from anywhere in the world with 99.9% uptime guarantee.",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Upload Files",
            description: "Drag and drop or browse to upload your CSV, PDF, and image files securely.",
        },
        {
            number: "02",
            title: "Organize & Manage",
            description: "Create folders, add tags, and manage your files with our intuitive interface.",
        },
        {
            number: "03",
            title: "Share & Collaborate",
            description: "Share files with team members or generate public links with custom permissions.",
        },
    ];

    const benefits = [
        "Unlimited file storage",
        "Advanced search and filtering",
        "Version control and history",
        "Team collaboration tools",
        "API access for integrations",
        "24/7 customer support",
    ];

    return <div>
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="mb-4">
                            <Zap className="w-3 h-3 mr-1" />
                            New: Real-time collaboration features
                        </Badge>
                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Store, Manage & Share Your
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Files Securely</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            The most secure and efficient way to store your CSV files, PDFs, and images.
                            Built for teams that need reliability, speed, and enterprise-grade security.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button size="lg" className="text-lg px-8 py-3 h-auto">
                                <Upload className="w-5 h-5 mr-2" />
                                Start Uploading Free
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-3 h-auto">
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </div>

                        {/* File Type Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {fileTypes.map((type, index) => (
                                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <CardContent className="p-6 text-center">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${type.bgColor} mb-4`}>
                                            <type.icon className={`w-8 h-8 ${type.color}`} />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                                        <p className="text-sm text-gray-600">{type.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose FileVault?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built with enterprise needs in mind, offering the security, speed, and reliability your team deserves.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"

                            >
                                <CardHeader className="pb-4">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 transition-all duration-300 text-white
                                        }`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get started in three simple steps and transform how your team handles file storage.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-xl font-bold mb-6">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full">

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Everything You Need for File Management
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                Join thousands of teams who trust FileVault to keep their important files safe,
                                organized, and accessible from anywhere in the world.
                            </p>
                            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 h-auto">
                                Get Started Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                                    <span className="text-blue-100">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-50 to-blue-50">
                        <CardContent className="p-12 text-center">
                            <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Ready to Secure Your Files?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                Join over 10,000+ teams who trust FileVault with their most important documents.
                                Start storing your files today, no credit card required.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="text-lg px-8 py-3 h-auto">
                                    <Users className="w-5 h-5 mr-2" />
                                    Get Started
                                </Button>
                                <Button size="lg" variant="outline" className="text-lg px-8 py-3 h-auto">
                                    Contact Sales
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Cloud className="h-8 w-8" />
                                <span className="text-xl font-bold">FileVault</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                The most secure way to store and manage your files in the cloud.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 FileVault. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
};
