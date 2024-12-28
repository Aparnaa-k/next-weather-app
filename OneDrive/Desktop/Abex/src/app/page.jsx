"use client";
import '@fortawesome/fontawesome-free/css/all.css';
import React, {useState, useEffect, useCallback, useMemo} from "react";
function MainComponent() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [messageStatuses, setMessageStatuses] = useState({});
  const [retryCount, setRetryCount] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [reactions, setReactions] = useState({});
  const [customEmojis, setCustomEmojis] = useState(["👍", "❤️", "😊", "😂"]);
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [newEmoji, setNewEmoji] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);
  const [newEmail] = useState({
    from_name: "Current User",
    from: "user@example.com",
  });
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupParticipants, setNewGroupParticipants] = useState([]);
  const [newGroupParticipant, setNewGroupParticipant] = useState("");
  const handleAddGroupParticipant = useCallback(() => {
    if (
      newGroupParticipant &&
      !newGroupParticipants.includes(newGroupParticipant)
    ) {
      setNewGroupParticipants((prev) => [...prev, newGroupParticipant]);
      setNewGroupParticipant("");
    }
  }, [newGroupParticipant, newGroupParticipants]);
  const handleRemoveGroupParticipant = useCallback((index) => {
    setNewGroupParticipants((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const handleCreateGroup = useCallback(() => {
    const newGroup = {
      id: Date.now(),
      from_name: "Current User",
      from: "user@example.com",
      to: newGroupParticipants,
      subject: newGroupName,
      snippet: "Group created",
      date: new Date().toISOString(),
      updated: new Date().toISOString(),
      status: "delivered",
      isGroup: true,
      messageAlignment: "center",
      messages: [
        {
          id: Date.now(),
          from_name: "Current User",
          from: "user@example.com",
          snippet: "Group created",
          date: new Date().toISOString(),
          status: "delivered",
        },
      ],
    };

    setEmails((prev) => [newGroup, ...prev]);
    setSelectedThread([newGroup]);
    setShowNewGroupDialog(false);
    setNewGroupName("");
    setNewGroupParticipants([]);
  }, [newGroupName, newGroupParticipants]);
  const handleReaction = useCallback((messageId, reaction) => {
    setReactions((prev) => {
      const messageReactions = prev[messageId] || {};
      const currentCount = messageReactions[reaction] || 0;
      return {
        ...prev,
        [messageId]: {
          ...messageReactions,
          [reaction]: currentCount + 1,
        },
      };
    });
  }, []);
  const handleAddEmoji = useCallback(() => {
    if (newEmoji && !customEmojis.includes(newEmoji)) {
      setCustomEmojis((prev) => [...prev, newEmoji]);
      setNewEmoji("");
    }
  }, [newEmoji, customEmojis]);
  const handleRemoveEmoji = useCallback((emoji) => {
    setCustomEmojis((prev) => prev.filter((e) => e !== emoji));
  }, []);
  const handleSendMessage = useCallback(() => {
    if (!selectedThread || !newMessage.trim()) return;

    const newEmail = {
      id: Date.now(),
      from_name: "Current User",
      from: "user@example.com",
      to: replyTo ? replyTo.from : selectedThread[0].from,
      subject: `Re: ${selectedThread[0].subject.replace(/^(Re: )+/, "")}`,
      snippet: newMessage,
      date: new Date().toISOString(),
      updated: new Date().toISOString(),
      status: "delivered",
      replyTo: replyTo ? replyTo.id : null,
    };

    setEmails((prev) => [
      newEmail,
      ...prev.filter(
        (email) =>
          email.subject.replace(/^(Re: )+/, "") !==
          selectedThread[0].subject.replace(/^(Re: )+/, ""),
      ),
    ]);
    setSelectedThread((prev) => [...prev, newEmail]);
    setMessageStatuses((prev) => ({ ...prev, [newEmail.id]: "delivered" }));
    setNewMessage("");
    setReplyTo(null);
  }, [selectedThread, newMessage, replyTo]);
  const [showParticipantDialog, setShowParticipantDialog] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      const maxRetries = 3;
      const retryDelay = 1000;

      const attemptFetch = async (attempt = 1) => {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const targetUrl =
          "https://stash.anupamkris.me/static/uploads/99c5890c-56bf-4560-841a-03422a0b1ad5.json";
      
        try {
          setLoading(true);
          const response = await fetch(proxyUrl + targetUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setEmails(data || []);
          setError(null);
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);
          if (attempt < maxRetries) {
            console.log(`Retrying in ${retryDelay}ms...`);
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * attempt)
            );
            await attemptFetch(attempt + 1);
          } else {
            setError(
              `Failed to load emails after ${maxRetries} attempts. Please try again later.`
            );
          }
        } finally {
          setLoading(false);
        }
      };
      

      attemptFetch();
    };
    fetchEmails();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setSelectedThread(null);
      }
      if (
        (e.key === "Enter" &&
          !e.shiftKey &&
          selectedThread &&
          e.target.matches('input[name="message"]')) ||
        (e.key === "Enter" && e.ctrlKey && selectedThread)
      ) {
        e.preventDefault();
        handleSendMessage();
      }
      if (
        (e.key === "/" || (e.key === "k" && e.metaKey)) &&
        !e.target.matches("input, textarea")
      ) {
        e.preventDefault();
        document.querySelector('input[type="text"]').focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedThread, handleSendMessage]);

  const groupedEmails = useMemo(() => {
    if (!emails || !Array.isArray(emails)) return {};

    const groups = {};
    emails.forEach((email) => {
      const baseSubject = email.subject.replace(/^(Re: )+/, "");
      if (!groups[baseSubject]) {
        groups[baseSubject] = [];
      }
      groups[baseSubject].push(email);
    });

    Object.keys(groups).forEach((subject) => {
      groups[subject].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return groups;
  }, [emails]);
  const handleEditMessage = useCallback(
    (messageId) => {
      const message = emails.find((email) => email.id === messageId);
      if (message) {
        setEditingMessageId(messageId);
        setEditMessage(message.snippet);
      }
    },
    [emails],
  );
  const handleUpdateMessage = useCallback(
    (messageId) => {
      setEmails((prev) =>
        prev.map((email) =>
          email.id === messageId
            ? {
                ...email,
                snippet: editMessage,
                updated: new Date().toISOString(),
              }
            : email,
        ),
      );
      setEditingMessageId(null);
      setEditMessage("");
    },
    [editMessage],
  );
  const filteredEmails = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return Object.entries(groupedEmails)
      .filter(
        ([subject, thread]) =>
          subject.toLowerCase().includes(query) ||
          thread.some(
            (email) =>
              email.snippet.toLowerCase().includes(query) ||
              email.from_name.toLowerCase().includes(query),
          ),
      )
      .sort((a, b) => {
        const latestA = new Date(a[1][0].date);
        const latestB = new Date(b[1][0].date);
        return latestB - latestA;
      });
  }, [groupedEmails, searchQuery]);
  const startVideoCall = useCallback(() => {
    if (participants.length === 0) return;
    const participantString = participants.join(",");
    window.open(
      `https://meet.google.com/new?authuser=0&hs=122&pli=1&participants=${participantString}`,
      "_blank",
    );
    setShowParticipantDialog(false);
    setParticipants([]);
  }, [participants]);

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa]">
      <div className="bg-[#3B82F6] p-4 text-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Email Chat</h1>
        <div className="text-lg">Hello {newEmail.from_name}</div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-white shadow-lg flex flex-col">
          <div className="p-4 border-b">
            <button
              onClick={() => setShowNewGroupDialog(true)}
              className="w-full px-4 py-2 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#2563EB] transition-all duration-200"
            >
              <i className="fas fa-plus"></i>
              New Group
            </button>
          </div>
          <div className="w-80 bg-white shadow-lg">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations... (Press '/' to focus)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <div className="overflow-y-auto">
              {filteredEmails.map(([subject, thread]) => (
                <div
                  key={subject}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    selectedThread &&
                    selectedThread[0].subject.includes(subject)
                      ? "bg-[#3B82F6]/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {subject}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(
                        thread[thread.length - 1].date,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-sm shadow-md">
                      {thread[thread.length - 1].from_name.charAt(0)}
                    </span>
                    <p className="ml-3 text-sm text-gray-600 truncate">
                      {thread[thread.length - 1].snippet}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <i className="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : selectedThread ? (
            <>
              <div className="border-b border-gray-200 p-4 bg-white flex justify-between items-center">
                <div className="relative">
                  <div
                    onClick={() => setShowParticipants(!showParticipants)}
                    className="cursor-pointer"
                  >
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      {selectedThread[0].subject}
                      <i className="fas fa-chevron-down text-sm"></i>
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedThread.length} messages
                    </p>
                  </div>
                  {showParticipants && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-10">
                      <h3 className="font-semibold mb-2">Participants</h3>
                      <div className="max-h-48 overflow-y-auto">
                        {Array.from(
                          new Set(selectedThread.map((email) => email.from)),
                        ).map((email) => (
                          <div
                            key={email}
                            className="py-2 flex items-center gap-2"
                          >
                            <span className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-sm">
                              {email.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm">{email}</span>
                            <div className="ml-auto flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(
                                    `https://meet.google.com/new?authuser=0&hs=122&pli=1&participants=${email}`,
                                    "_blank",
                                  );
                                }}
                                className="text-[#3B82F6] hover:text-[#2563EB]"
                              >
                                <i className="fas fa-video"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setParticipants([...participants, email]);
                                  setShowParticipantDialog(true);
                                }}
                                className="text-[#3B82F6] hover:text-[#2563EB]"
                              >
                                <i className="fas fa-users"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowParticipantDialog(true)}
                  className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg flex items-center gap-2 hover:bg-[#2563EB] transition-all duration-200"
                >
                  <i className="fas fa-video"></i>
                  Start Video Call
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto" id="messageContainer">
                {selectedThread.map((email) => (
                  <div
                    key={email.id}
                    className={`flex mb-6 ${email.from === "user@example.com" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl p-4 group ${
                        email.from === "user@example.com"
                          ? "bg-[#3B82F6] text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            email.from === "user@example.com"
                              ? "bg-white text-[#3B82F6]"
                              : "bg-[#3B82F6] text-white"
                          }`}
                        >
                          {email.from_name.charAt(0)}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {email.from_name}
                          </p>
                          <p className="text-xs opacity-75">{email.from}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {email.from === "user@example.com" ? (
                            messageStatuses[email.id] === "failed" ? (
                              <button
                                onClick={() => handleRetry(email.id)}
                                className="text-xs text-red-500 hover:text-red-600"
                              >
                                Retry
                              </button>
                            ) : (
                              <i
                                className={`fas fa-${
                                  messageStatuses[email.id] === "sending"
                                    ? "clock"
                                    : messageStatuses[email.id] === "delivered"
                                      ? "check-double"
                                      : "check"
                                } text-xs opacity-75`}
                              ></i>
                            )
                          ) : (
                            <button
                              onClick={() => setReplyTo(email)}
                              className={`text-xs ${
                                email.from === "user@example.com"
                                  ? "text-white"
                                  : "text-[#3B82F6]"
                              } hover:opacity-75`}
                            >
                              <i className="fas fa-reply"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      {editingMessageId === email.id ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="flex-1 bg-transparent border-b border-white focus:outline-none"
                          />
                          <button onClick={() => handleUpdateMessage(email.id)}>
                            <i className="fas fa-check"></i>
                          </button>
                        </div>
                      ) : (
                        <>
                          {email.replyTo && (
                            <div className="text-xs opacity-75 mb-2">
                              Replying to @
                              {emails.find((e) => e.id === email.replyTo)?.from}
                            </div>
                          )}
                          <p
                            className={`text-sm leading-relaxed ${email.messageAlignment === "center" ? "text-center" : ""}`}
                          >
                            {email.snippet}
                          </p>
                        </>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs opacity-75">
                          {new Date(email.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <div className="flex items-center gap-2">
                          {reactions[email.id] && (
                            <div className="flex gap-1">
                              {Object.entries(reactions[email.id]).map(
                                ([reaction, count]) => (
                                  <span
                                    key={reaction}
                                    className="text-xs bg-black bg-opacity-10 rounded px-1"
                                  >
                                    {reaction} {count}
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                          <div className="hidden group-hover:flex gap-1 items-center">
                            {customEmojis.map((reaction) => (
                              <button
                                key={reaction}
                                onClick={() =>
                                  handleReaction(email.id, reaction)
                                }
                                className="text-xs hover:scale-125 transition-transform"
                              >
                                {reaction}
                              </button>
                            ))}
                            <button
                              onClick={() => setShowEmojiInput(!showEmojiInput)}
                              className="text-xs hover:opacity-75 ml-1"
                            >
                              <i className="fas fa-cog"></i>
                            </button>
                            {showEmojiInput && (
                              <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-8">
                                <div className="flex gap-2 mb-2">
                                  <input
                                    type="text"
                                    value={newEmoji}
                                    onChange={(e) =>
                                      setNewEmoji(e.target.value)
                                    }
                                    placeholder="Add emoji"
                                    className="w-20 text-xs p-1 border rounded"
                                  />
                                  <button
                                    onClick={handleAddEmoji}
                                    className="text-xs bg-[#3B82F6] text-white px-2 rounded"
                                  >
                                    Add
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {customEmojis.map((emoji) => (
                                    <div
                                      key={emoji}
                                      className="flex items-center"
                                    >
                                      <span className="text-xs">{emoji}</span>
                                      <button
                                        onClick={() => handleRemoveEmoji(emoji)}
                                        className="text-xs text-red-500 ml-1"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {email.from === "user@example.com" &&
                            !editingMessageId && (
                              <button
                                onClick={() => handleEditMessage(email.id)}
                                className="text-xs opacity-75 hover:opacity-100"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white shadow-lg">
                <div className="flex flex-col gap-2">
                  {replyTo && (
                    <div className="text-sm text-gray-500 flex items-center gap-2 px-4">
                      <span>Replying to @{replyTo.from}</span>
                      <button
                        onClick={() => setReplyTo(null)}
                        className="text-xs hover:text-red-500"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
                    <input
                      type="text"
                      name="message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message... (Ctrl + Enter to send)"
                      className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] rounded-md py-2 transition-all duration-200"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center hover:bg-[#2563EB] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
      {showParticipantDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add Participants to Video Call
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => {
                  if (
                    newParticipant &&
                    !participants.includes(newParticipant)
                  ) {
                    setParticipants([...participants, newParticipant]);
                    setNewParticipant("");
                  }
                }}
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="mb-4">
              {participants.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span>{p}</span>
                  <button
                    onClick={() =>
                      setParticipants(
                        participants.filter((_, idx) => idx !== i),
                      )
                    }
                    className="text-red-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowParticipantDialog(false);
                  setParticipants([]);
                }}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={startVideoCall}
                disabled={participants.length === 0}
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg disabled:opacity-50"
              >
                Start Call
              </button>
            </div>
          </div>
        </div>
      )}
      {showNewGroupDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Group Name"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newGroupParticipant}
                  onChange={(e) => setNewGroupParticipant(e.target.value)}
                  placeholder="Add participant email"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleAddGroupParticipant}
                  className="mt-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg w-full"
                >
                  Add Participant
                </button>
              </div>
              <div className="max-h-40 overflow-y-auto">
                {newGroupParticipants.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{p}</span>
                    <button
                      onClick={() => handleRemoveGroupParticipant(i)}
                      className="text-red-500"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowNewGroupDialog(false);
                  setNewGroupName("");
                  setNewGroupParticipants([]);
                }}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!newGroupName || newGroupParticipants.length === 0}
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg disabled:opacity-50"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;