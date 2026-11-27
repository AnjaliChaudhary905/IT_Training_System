import { useEffect, useState } from "react";
import { Eye, Trash2, X } from "lucide-react";

import contactServices from "../../services/contactService";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messageLoading, setMessageLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        const loadMessages = async () => {
            try {
                const response = await contactServices.getAllContactMessages();

                if (ignore) {
                    return;
                }

                if (response.success) {
                    setMessages(response.data);
                }
            } catch (error) {
                if (ignore) {
                    return;
                }

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load contact messages"
                );
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadMessages();

        return () => {
            ignore = true;
        };
    }, []);
    const handleView = async (id) => {
        try {
            setMessageLoading(true);

            const response = await contactServices.getContactMessageById(id);

            if (response.success) {
                setSelectedMessage(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setMessageLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const response = await contactServices.updateContactStatus(
                id,
                status
            );

            if (response.success) {
                setMessages((previousMessages) =>
                    previousMessages.map((message) =>
                        message._id === id
                            ? {
                                ...message,
                                status: response.data.status,
                            }
                            : message
                    )
                );

                if (selectedMessage?._id === id) {
                    setSelectedMessage(response.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await contactServices.deleteContactMessage(id);

            if (response.success) {
                setMessages((previousMessages) =>
                    previousMessages.filter(
                        (message) => message._id !== id
                    )
                );

                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusClass = (status) => {
        if (status === "NEW") {
            return "bg-blue-50 text-blue-600";
        }

        if (status === "READ") {
            return "bg-gray-100 text-gray-600";
        }

        return "bg-green-50 text-green-600";
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading messages...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Contact Messages
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage messages and inquiries submitted through
                    the website.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Subject
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Actions
                                </th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {messages.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-sm text-gray-400"
                                    >
                                        No contact messages found.
                                    </td>
                                </tr>

                            ) : (

                                messages.map((message) => (

                                    <tr
                                        key={message._id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">
                                                {message.name}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {message.email}
                                        </td>

                                        <td className="max-w-[250px] truncate px-6 py-4 text-sm text-gray-600">
                                            {message.subject}
                                        </td>

                                        <td className="px-6 py-4">

                                            <select
                                                value={message.status}
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        message._id,
                                                        event.target.value
                                                    )
                                                }
                                                className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ${getStatusClass(
                                                    message.status
                                                )}`}
                                            >
                                                <option value="NEW">
                                                    NEW
                                                </option>

                                                <option value="READ">
                                                    READ
                                                </option>

                                                <option value="REPLIED">
                                                    REPLIED
                                                </option>
                                            </select>

                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleView(
                                                            message._id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#071B41]"
                                                    title="View message"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            message._id
                                                        )
                                                    }
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                    title="Delete message"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Message Modal */}
            {selectedMessage && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

                    <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

                        <div className="flex items-center justify-between border-b border-gray-200 p-6">

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Message Details
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Contact inquiry information
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {messageLoading ? (

                            <div className="p-8 text-center text-sm text-gray-500">
                                Loading message...
                            </div>

                        ) : (

                            <div className="space-y-5 p-6">

                                <div className="grid gap-4 sm:grid-cols-2">

                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">
                                            Name
                                        </p>

                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedMessage.name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">
                                            Email
                                        </p>

                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedMessage.email}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedMessage.phone || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                                selectedMessage.status
                                            )}`}
                                        >
                                            {selectedMessage.status}
                                        </span>
                                    </div>

                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase text-gray-400">
                                        Subject
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-900">
                                        {selectedMessage.subject}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase text-gray-400">
                                        Message
                                    </p>

                                    <div className="mt-2 rounded-lg bg-gray-50 p-4">
                                        <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusChange(
                                                selectedMessage._id,
                                                "READ"
                                            )
                                        }
                                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50  transition-transform"
                                    >
                                        Mark as Read
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusChange(
                                                selectedMessage._id,
                                                "REPLIED"
                                            )
                                        }
                                        className="rounded-lg bg-[#071B41] px-4 py-2 text-sm font-medium text-white hover:bg-[#0b2657]"
                                    >
                                        Mark as Replied
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminMessages;