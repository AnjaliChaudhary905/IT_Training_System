import Contact from "./contact.model.js";

const createContactMessage = async (contactData) => {
    const contact = await Contact.create(contactData);

    return contact;
};

const getAllContactMessages = async () => {
    const contacts = await Contact.find()
        .sort({ createdAt: -1 });

    return contacts;
};

const getContactMessageById = async (contactId) => {
    const contact = await Contact.findById(contactId);

    return contact;
};

const updateContactStatus = async (contactId, status) => {
    const contact = await Contact.findByIdAndUpdate(
        contactId,
        { status },
        {
            new: true,
            runValidators: true,
        }
    );

    return contact;
};

const deleteContactMessage = async (contactId) => {
    const contact = await Contact.findByIdAndDelete(contactId);

    return contact;
};

const contactService = {
    createContactMessage,
    getAllContactMessages,
    getContactMessageById,
    updateContactStatus,
    deleteContactMessage,
};

export default contactService;