import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";
import { mockPeople } from "@/data/mock-people";
import { Calendar, FileText, Scan, User } from "lucide-react";

function PeopleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockPeople.map((person) => (
        <Card key={person.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={person.avatar || ""} alt={person.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{person.name}</CardTitle>
            <p className="text-muted-foreground text-sm">Age {person.age}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {person.bio}
            </p>
            
            <div className="space-y-2">
              <HStack className="justify-between text-sm">
                <HStack className="gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Appointments</span>
                </HStack>
                <Badge variant="secondary">{person.appointments.length}</Badge>
              </HStack>
              
              <HStack className="justify-between text-sm">
                <HStack className="gap-1">
                  <Scan className="w-4 h-4" />
                  <span>Scans</span>
                </HStack>
                <Badge variant="secondary">{person.scans.length}</Badge>
              </HStack>
              
              <HStack className="justify-between text-sm">
                <HStack className="gap-1">
                  <FileText className="w-4 h-4" />
                  <span>Conditions</span>
                </HStack>
                <Badge variant="secondary">{person.dentalConditions.length}</Badge>
              </HStack>
            </div>
            
            <div className="pt-4 border-t">
              <Button asChild className="w-full">
                <Link href={`/people/${person.id}`}>
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function PeoplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <VStack className="gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Dental AI Patient Profiles
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manage and view detailed dental profiles, appointment history, and scan results 
            for all patients in our AI-powered dental care system.
          </p>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-muted rounded mx-auto w-32 mb-2" />
                  <div className="h-4 bg-muted rounded mx-auto w-16" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-12 bg-muted rounded" />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="h-8 bg-muted rounded" />
                      ))}
                    </div>
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }>
          <PeopleGrid />
        </Suspense>
      </VStack>
    </div>
  );
}