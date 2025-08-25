"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { getTodaysAppointmentsSorted, type TodaysAppointment } from "./mock/appointments";
import { useChatContext } from "@/app/_contexts/chat-context";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200", 
  scheduled: "bg-gray-100 text-gray-800 border-gray-200",
  cancelled: "bg-red-100 text-red-800 border-red-200"
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  scheduled: "Scheduled", 
  cancelled: "Cancelled"
};

interface AppointmentCardProps {
  appointment: TodaysAppointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { startPatientSimulation } = useChatContext();
  const { patient, timeDisplay, type, status, notes, duration } = appointment;
  
  const handleStartSimulation = () => {
    startPatientSimulation(patient);
  };

  return (
    <Card className="w-[320px] h-[200px] flex-shrink-0 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-primary/10 hover:border-primary/30 flex flex-col overflow-hidden">
      <CardHeader className="pb-1 px-4 pt-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage 
                src={`/patient-profiles/${patient.id.toLowerCase()}.png`}
                alt={patient.name}
              />
              <AvatarFallback className="text-xs font-medium">
                {patient.name}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm font-semibold truncate">
                {patient.fullName}
              </CardTitle>
              <CardDescription className="text-xs truncate">
                {type}
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-xs flex-shrink-0", statusColors[status])}
          >
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-1 flex flex-col justify-between flex-1 min-h-0">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeDisplay}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{duration} min</span>
            </div>
          </div>
          
          <div className="h-6 overflow-hidden">
            {notes && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {notes}
              </p>
            )}
          </div>
        </div>
        
        <Button
          onClick={handleStartSimulation}
          size="sm"
          className="w-full h-8 text-xs flex-shrink-0"
          variant={status === "completed" ? "outline" : "default"}
        >
          {status === "completed" ? "Review Notes" : "Start Appointment"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function TodaysSchedule() {
  const appointments = getTodaysAppointmentsSorted();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const checkScrollable = () => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    // Check initial state
    checkScrollable();
    
    // Add resize listener to recheck when window size changes
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [appointments]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <Badge variant="secondary" className="ml-2">
            {appointments.length} appointments
          </Badge>
        </div>
        
        <div className="hidden md:flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto md:flex-nowrap flex-wrap no-scrollbar pb-2"
      >
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
          >
            <AppointmentCard appointment={appointment} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
