import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HStack, VStack } from "@/components/ui/stack";
import { mockPeople } from "@/data/mock-people";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Heart, 
  Scan, 
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { format } from "date-fns";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PersonProfilePage({ params }: Props) {
  const { id } = await params;
  const person = mockPeople.find(p => p.id === id);
  
  if (!person) {
    notFound();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <VStack className="gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/people">
              <ArrowLeft className="w-4 h-4" />
              Back to People
            </Link>
          </Button>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <HStack className="gap-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={person.avatar || ""} alt={person.name} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <VStack className="flex-1 gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{person.name}</h1>
                  <p className="text-muted-foreground text-lg">Age {person.age}</p>
                </div>
                
                <p className="text-muted-foreground">{person.bio}</p>
                
                <HStack className="gap-6">
                  <HStack className="gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{person.appointments.length} Appointments</span>
                  </HStack>
                  <HStack className="gap-2">
                    <Scan className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">{person.scans.length} Scans</span>
                  </HStack>
                  <HStack className="gap-2">
                    <FileText className="w-5 h-5 text-green-500" />
                    <span className="font-medium">{person.dentalConditions.length} Conditions</span>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Medical History & Conditions */}
          <VStack className="gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VStack className="gap-3">
                  {person.medicalHistory.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </VStack>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Dental Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VStack className="gap-3">
                  {person.dentalConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="justify-start">
                      {condition}
                    </Badge>
                  ))}
                </VStack>
              </CardContent>
            </Card>
          </VStack>

          {/* Right Column - Appointments & Scans */}
          <div className="lg:col-span-2">
            <VStack className="gap-6">
              {/* Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    Appointment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VStack className="gap-4">
                    {person.appointments.map((appointment, index) => (
                      <div key={appointment.id}>
                        <HStack className="justify-between items-start gap-4">
                          <VStack className="flex-1 gap-2">
                            <HStack className="justify-between items-center w-full">
                              <HStack className="gap-3">
                                {getStatusIcon(appointment.status)}
                                <span className="font-medium capitalize">
                                  {appointment.type.replace('-', ' ')}
                                </span>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </HStack>
                              <span className="text-sm text-muted-foreground">
                                {format(appointment.date, 'MMM d, yyyy')}
                              </span>
                            </HStack>
                            
                            <HStack className="gap-4 text-sm text-muted-foreground">
                              <HStack className="gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{appointment.dentist}</span>
                              </HStack>
                              <HStack className="gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{appointment.duration}min</span>
                              </HStack>
                            </HStack>
                            
                            {appointment.notes && (
                              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                            )}
                            
                            {appointment.treatments.length > 0 && (
                              <HStack className="gap-2 flex-wrap">
                                {appointment.treatments.map((treatment, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {treatment}
                                  </Badge>
                                ))}
                              </HStack>
                            )}
                          </VStack>
                        </HStack>
                        
                        {index < person.appointments.length - 1 && (
                          <Separator className="mt-4" />
                        )}
                      </div>
                    ))}
                  </VStack>
                </CardContent>
              </Card>

              {/* Scans */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="w-5 h-5 text-purple-500" />
                    Dental Scans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VStack className="gap-6">
                    {person.scans.map((scan, index) => (
                      <div key={scan.id}>
                        <VStack className="gap-4">
                          <HStack className="justify-between items-start">
                            <VStack className="gap-2">
                              <HStack className="gap-3">
                                <Eye className="w-4 h-4 text-purple-500" />
                                <span className="font-medium capitalize">
                                  {scan.type} Scan
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {format(scan.date, 'MMM d, yyyy')}
                                </span>
                              </HStack>
                            </VStack>
                          </HStack>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Findings</h4>
                              <VStack className="gap-1">
                                {scan.findings.map((finding, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">
                                    • {finding}
                                  </p>
                                ))}
                              </VStack>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Recommendations</h4>
                              <VStack className="gap-1">
                                {scan.recommendations.map((rec, i) => (
                                  <p key={i} className="text-sm text-muted-foreground">
                                    • {rec}
                                  </p>
                                ))}
                              </VStack>
                            </div>
                          </div>
                        </VStack>
                        
                        {index < person.scans.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </VStack>
                </CardContent>
              </Card>
            </VStack>
          </div>
        </div>
      </VStack>
    </div>
  );
}