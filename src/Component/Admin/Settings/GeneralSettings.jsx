import CustomInput from "@/Component/CustomInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  useGetAdminGeneralQuery,
  useUpdateGeneralMutation,
} from "@/services/admin-dashboard/dashboard";
import toast from "react-hot-toast";

export default function GeneralSettings() {
  const { data, isLoading, refetch } = useGetAdminGeneralQuery();
  const [updateGeneral, { isLoading: isUpdating }] = useUpdateGeneralMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data && data.data) {
      reset({
        organization_name: data.data.organization_name || "",
        contact_email: data.data.contact_email || "",
        phoneCode: data.data.phone_number?.slice(0, 4) || "+234",
        phone_number: data.data.phone_number?.slice(4) || "",
        logo: "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    const phone_number = `${data.phoneCode}${data.phone_number}`;
    const payload = {
      organization_name: data.organization_name,
      contact_email: data.contact_email,
      phone_number,
    };

    // Handle logo file upload if present
    if (data.logo && data.logo[0]) {
      const file = data.logo[0];
      const form = new FormData();
      form.append("organization_name", payload.organization_name);
      form.append("contact_email", payload.contact_email);
      form.append("phone_number", payload.phone_number);
      form.append("logo", file);
      try {
        await updateGeneral(form).unwrap();
        toast.success("General settings updated!");
        refetch();
      } catch (err) {
        toast.error("Update failed");
      }
      return;
    }

    // If logo is not required or API expects JSON:
    try {
      await updateGeneral(payload).unwrap();
      toast.success("Settings updated!");
    } catch (err) {
      toast.error("Update failed");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Organization Name"
          name="organization_name"
          register={register}
          placeholder="Enter Organization Name"
          errors={errors}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            {...register("logo")}
            className={`w-full border border-gray-300 text-sm rounded-md px-3 py-2 focus:outline-none`}
          />
        </div>

        <CustomInput
          label="Contact Email"
          name="contact_email"
          type="email"
          register={register}
          placeholder="Enter Email"
          errors={errors}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="flex">
            <select
              {...register("phoneCode")}
              defaultValue="+234"
              className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              {...register("phone_number", { required: true })}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 border-l-0 rounded-r px-3 py-2 focus:outline-none"
            />
          </div>
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              Phone number is required
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-[#0A8625] hover:bg-green-700 text-white px-5 py-2 rounded flex items-center gap-2"
        >
          <AiOutlineCheckCircle className="w-5 h-5" />
          {isUpdating ? "Saving..." : "Save Details"}
        </button>
      </div>
    </form>
  );
}
