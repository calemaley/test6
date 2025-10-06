import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  Bot,
  MessageCircle,
  RefreshCw,
  Search,
  User,
} from "lucide-react";

import { listChatbotSessions, type ChatbotSession } from "@/lib/chatbot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function AdminChatbotSessions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sessionsQuery = useQuery({
    queryKey: ["admin", "chatbot-sessions"],
    queryFn: listChatbotSessions,
  });

  const sessions = sessionsQuery.data ?? [];

  const filteredSessions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sessions;
    return sessions.filter((session) => {
      const haystack =
        `${session.visitorName} ${session.visitorEmail} ${session.visitorPhone} ${session.lastIntent ?? ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [sessions, searchTerm]);

  const selectedSession = useMemo(() => {
    if (!filteredSessions.length) return null;
    if (selectedId) {
      return (
        filteredSessions.find((session) => session.id === selectedId) ??
        filteredSessions[0]
      );
    }
    return filteredSessions[0];
  }, [filteredSessions, selectedId]);

  const handleSelect = (session: ChatbotSession) => {
    setSelectedId(session.id);
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Chatbot sessions
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Review conversations captured by the JBRANKY Bot and follow up on
            leads.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => sessionsQuery.refetch()}
          disabled={sessionsQuery.isFetching}
        >
          {sessionsQuery.isFetching && (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          )}
          Refresh
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="border-none bg-white shadow-sm">
          <CardHeader className="space-y-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base text-slate-900">
                <MessageCircle className="h-4 w-4 text-primary" /> Sessions
              </CardTitle>
              <CardDescription>
                {filteredSessions.length} conversation
                {filteredSessions.length === 1 ? "" : "s"} recorded.
              </CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, or phone"
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[540px] overflow-y-auto">
              {sessionsQuery.isLoading ? (
                <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                  Loading chatbot sessions...
                </div>
              ) : filteredSessions.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-muted-foreground">
                  No chatbot sessions yet.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {filteredSessions.map((session) => {
                    const created = new Date(session.createdAt);
                    const relative = formatDistanceToNow(
                      new Date(session.updatedAt),
                      {
                        addSuffix: true,
                      },
                    );
                    const isActive = selectedSession?.id === session.id;
                    return (
                      <li key={session.id}>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-4 py-3 text-left transition",
                            isActive ? "bg-primary/5" : "hover:bg-muted/40",
                          )}
                          onClick={() => handleSelect(session)}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-slate-900">
                                {session.visitorName}
                              </p>
                              <Badge
                                variant={
                                  session.metadata.leadCaptured
                                    ? "default"
                                    : "outline"
                                }
                              >
                                Lead
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {session.visitorEmail}
                            </p>
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground/70">
                              <span>
                                {format(created, "MMM d, yyyy HH:mm")}
                              </span>
                              <span>Updated {relative}</span>
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <Bot className="h-4 w-4 text-secondary" /> Session details
            </CardTitle>
            <CardDescription>
              {selectedSession
                ? `Conversation started on ${format(new Date(selectedSession.createdAt), "MMM d, yyyy HH:mm")}`
                : "Select a chatbot session to view conversation history."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sessionsQuery.isLoading ? (
              <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
                Loading chat details...
              </div>
            ) : !selectedSession ? (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-10 text-center text-sm text-muted-foreground">
                <MessageCircle className="h-6 w-6" />
                <p>Select a session to view its transcript.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <section className="space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Lead information
                  </h2>
                  <div className="rounded-lg border bg-muted/20 p-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-900">
                      <User className="h-4 w-4" />
                      <span className="font-medium">
                        {selectedSession.visitorName}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {selectedSession.visitorEmail}
                    </p>
                    <p className="text-muted-foreground">
                      {selectedSession.visitorPhone}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground/80">
                      Tutorial completed:{" "}
                      {selectedSession.metadata.tutorialCompleted
                        ? "Yes"
                        : "No"}
                    </p>
                    {selectedSession.lastIntent && (
                      <p className="text-xs text-muted-foreground/80">
                        Last intent detected:{" "}
                        {humanizeIntent(selectedSession.lastIntent)}
                      </p>
                    )}
                    {selectedSession.originPath && (
                      <p className="text-xs text-muted-foreground/80">
                        Origin: {selectedSession.originPath}
                      </p>
                    )}
                  </div>
                </section>

                <section className="space-y-3">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Conversation timeline
                  </h2>
                  <div className="max-h-[420px] space-y-4 overflow-y-auto rounded-lg border bg-muted/10 p-4">
                    {selectedSession.messages.length === 0 ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span>No messages recorded for this session.</span>
                      </div>
                    ) : (
                      selectedSession.messages.map((message) => (
                        <div
                          key={message.id}
                          className="space-y-1 rounded-lg bg-white/70 p-3 shadow-sm ring-1 ring-muted/40"
                        >
                          <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                            <span className="font-medium text-slate-900">
                              {message.sender === "visitor"
                                ? selectedSession.visitorName
                                : message.sender === "bot"
                                  ? "JBRANKY Bot"
                                  : "System"}
                            </span>
                            <span>
                              {format(
                                new Date(message.createdAt),
                                "MMM d, yyyy HH:mm",
                              )}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-sm text-slate-900">
                            {message.content}
                          </p>
                          {message.intent && (
                            <p className="text-[11px] uppercase tracking-wide text-muted-foreground/70">
                              Intent: {humanizeIntent(message.intent)}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function humanizeIntent(intent: string): string {
  switch (intent) {
    case "services_overview":
      return "Services overview";
    case "service_detail":
      return "Service detail";
    case "contact_info":
      return "Contact info";
    case "callback_request":
      return "Call back";
    case "consultation_booking":
      return "Consultation";
    case "general_inquiry":
      return "General";
    case "tutorial":
      return "Tutorial";
    case "welcome":
      return "Welcome";
    case "thank_you":
      return "Thank you";
    default:
      return intent.replace(/_/g, " ");
  }
}
