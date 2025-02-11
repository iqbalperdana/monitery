import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createClient, Client } from "../../services/clientsService";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").optional(),
  phone: yup.string().required("Phone number is required"),
});

const CreateClientPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Client) => {
    try {
      await createClient(data);
      navigate("/clients");
    } catch (err) {
      console.error("Failed to create client");
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Client</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">First Name</label>
          <input
            {...register("firstName")}
            className="w-full p-2 border rounded"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full p-2 border rounded"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            {...register("email")}
            className="w-full p-2 border rounded"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            {...register("phone")}
            className="w-full p-2 border rounded"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default CreateClientPage;
