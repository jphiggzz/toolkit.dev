import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Camera, 
  ClipboardList, 
  DollarSign,
  Download,
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { format, differenceInYears } from "date-fns";
import { getPatientById } from "@/app/_components/chat/mock/patients";
import { 
  MOCK_DOCUMENT_CENTER, 
  MOCK_IMAGE_MODULE, 
  MOCK_CHART_NOTES, 
  MOCK_LEDGER,
  type DocumentCenterItem,
  type ImageModuleItem,
  type ChartNote,
  type LedgerEntry
} from "../mock-dental-data";

interface PatientDetailsPageProps {
  params: Promise<{ id: string }>;
}

function DocumentCenterSection({ documents }: { documents: DocumentCenterItem[] }) {
  const getTypeIcon = (type: DocumentCenterItem['type']) => {
    switch (type) {
      case 'scan': return '📄';
      case 'upload': return '📎';
      case 'form': return '📋';
      case 'insurance': return '🏥';
      default: return '📄';
    }
  };

  const getTypeBadgeColor = (type: DocumentCenterItem['type']) => {
    switch (type) {
      case 'scan': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'upload': return 'bg-green-50 text-green-700 border-green-200';
      case 'form': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'insurance': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Document Center</h3>
        <Badge variant="secondary" className="ml-2">{documents.length} files</Badge>
      </div>
      <div className="grid gap-3">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(doc.type)}</span>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{doc.category}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{format(new Date(doc.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTypeBadgeColor(doc.type)}>
                  {doc.type}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ImageModuleSection({ images }: { images: ImageModuleItem[] }) {
  const getTypeIcon = (type: ImageModuleItem['type']) => {
    switch (type) {
      case 'radiograph': return '🦷';
      case 'photo': return '📷';
      case 'scan': return '🔬';
      default: return '📷';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Image Module</h3>
        <Badge variant="secondary" className="ml-2">{images.length} images</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img 
                src={image.imageUrl} 
                alt={image.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(image.type)}</span>
                  <div>
                    <h4 className="font-medium">{image.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(image.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {image.type}
                </Badge>
              </div>
              
              {image.teeth && (
                <div className="mb-2">
                  <p className="text-sm font-medium mb-1">Teeth:</p>
                  <div className="flex flex-wrap gap-1">
                    {image.teeth.map((tooth) => (
                      <Badge key={tooth} variant="secondary" className="text-xs">
                        #{tooth}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
              
              {image.findings && image.findings.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Findings:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {image.findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-600">•</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChartSection({ notes }: { notes: ChartNote[] }) {
  const getTypeColor = (type: ChartNote['type']) => {
    switch (type) {
      case 'clinical': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'perio': return 'bg-red-50 text-red-700 border-red-200';
      case 'treatment_plan': return 'bg-green-50 text-green-700 border-green-200';
      case 'hygiene': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Chart Notes</h3>
        <Badge variant="secondary" className="ml-2">{notes.length} entries</Badge>
      </div>
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">
                    {format(new Date(note.date), 'MMM d')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getTypeColor(note.type)}>
                      {note.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm font-medium">{note.provider}</span>
                  </div>
                  {note.teeth && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {note.teeth.map((tooth) => (
                        <Badge key={tooth} variant="outline" className="text-xs">
                          #{tooth}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {format(new Date(note.date), 'h:mm a')}
              </span>
            </div>
            
            <p className="text-sm mb-3">{note.notes}</p>
            
            {note.procedures && note.procedures.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Procedures:</p>
                <div className="flex flex-wrap gap-1">
                  {note.procedures.map((procedure, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {procedure}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function LedgerSection({ entries }: { entries: LedgerEntry[] }) {
  const getTypeColor = (type: LedgerEntry['type']) => {
    switch (type) {
      case 'charge': return 'text-red-600';
      case 'payment': return 'text-green-600';
      case 'insurance': return 'text-blue-600';
      case 'adjustment': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-700 border-green-200';
      case 'processed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'denied': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const currentBalance = entries[entries.length - 1]?.balance || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Ledger</h3>
          <Badge variant="secondary" className="ml-2">{entries.length} transactions</Badge>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className={`text-lg font-semibold ${currentBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
            ${Math.abs(currentBalance).toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{entry.description}</span>
                  <Badge variant="outline" className="capitalize">
                    {entry.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </p>
                {entry.insurance && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-muted-foreground">
                      {entry.insurance.carrier}
                    </span>
                    <Badge className={getClaimStatusColor(entry.insurance.claimStatus)}>
                      {entry.insurance.claimStatus}
                    </Badge>
                    {entry.insurance.claimNumber && (
                      <span className="text-xs text-muted-foreground">
                        #{entry.insurance.claimNumber}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className={`font-semibold ${getTypeColor(entry.type)}`}>
                  {entry.amount > 0 ? '+' : ''}${entry.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Bal: ${entry.balance.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default async function PatientDetailsPage({ params }: PatientDetailsPageProps) {
  const { id } = await params;
  const patient = getPatientById(id);

  if (!patient) {
    notFound();
  }

  const age = differenceInYears(new Date(), new Date(patient.dob));
  const initials = patient.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  const profileImagePath = `/patient-profiles/${patient.id.toLowerCase()}.png`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/people">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
        </Link>
        
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileImagePath} alt={patient.fullName} />
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{patient.fullName}</h1>
                  <p className="text-muted-foreground mb-3">Patient ID: {patient.id}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Age {age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>DOB: {format(new Date(patient.dob), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.fullName.toLowerCase().replace(' ', '.')}@email.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/?patient=${patient.id}`}>
                    <Button>
                      Start Simulation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Last Visit</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="font-semibold">{format(new Date(patient.lastVisit), 'MMM d, yyyy')}</p>
                <p className="text-sm text-muted-foreground">{patient.visitReason.primary}</p>
              </CardContent>
            </Card>
            
            <Card className="p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Allergies</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No known allergies</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Concerns</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="font-semibold">{patient.activeConcerns.length}</p>
                <p className="text-sm text-muted-foreground">
                  {patient.activeConcerns.length > 0 ? patient.activeConcerns[0] : 'None'}
                </p>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Chart
          </TabsTrigger>
          <TabsTrigger value="ledger" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Ledger
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents" className="mt-6">
          <DocumentCenterSection documents={MOCK_DOCUMENT_CENTER} />
        </TabsContent>
        
        <TabsContent value="images" className="mt-6">
          <ImageModuleSection images={MOCK_IMAGE_MODULE} />
        </TabsContent>
        
        <TabsContent value="chart" className="mt-6">
          <ChartSection notes={MOCK_CHART_NOTES} />
        </TabsContent>
        
        <TabsContent value="ledger" className="mt-6">
          <LedgerSection entries={MOCK_LEDGER} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
