
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NewTicketForm from "@/components/tickets/NewTicketForm";

const NewTicket = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Create Support Ticket</h2>
        <NewTicketForm />
      </div>
    </DashboardLayout>
  );
};

export default NewTicket;
