import CustomFileUpload from "@/Component/CustomFileUpload";
import CustomInput from "@/Component/CustomInput";
import {
  useCreateContentMutation,
  useUpdateContentMutation,
} from "@/services/admin-dashboard/dashboard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsPatchCheck, BsBookmarkDash } from "react-icons/bs";
import { FaRegTimesCircle } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function CreateNewsModal({
  onClose,
  mode = "create",
  initialData,
  refetch,
}) {
  const [createContent, { isLoading: createLoading }] =
    useCreateContentMutation();
  const [updateContent, { isLoading: updateLoading }] =
    useUpdateContentMutation();
  console.log(initialData);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  // Watch the file input
  const watchFile = watch("image");

  // Update preview when file changes
  useEffect(() => {
    if (watchFile && watchFile.length > 0 && mode === "create") {
      const file = watchFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // cleanup old objectURL to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [watchFile]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset(initialData); // prefill form fields
    }
  }, [mode, initialData, reset]);

  const onSubmit = async (data) => {
    const file = typeof data.image == "string" ? data.image : data.image?.[0]; // File object

    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("title", data.title);
    if (file) {
      formData.append("image", file);
    }

    // 🔥 Properly inspect FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (mode === "edit") {
      try {
        console.log("Updated Data ✅");
        await updateContent({ id: initialData?.id, formData }).unwrap();
        toast.success("Content updated successfully");
        refetch();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Update failed");
      }
    } else {
      try {
        const res = await createContent(formData);
        console.log(res, "Create Content Response");
        toast.success("Content created successfully");
        refetch();
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Creation failed");
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl border border-[#E9EEEA] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-maven font-semibold">
            {mode === "edit" ? "Edit Content" : "Create New Content"}
          </h3>
          <button
            onClick={onClose}
            className="text-red-600 hover:scale-110 transition"
          >
            <MdOutlineCancelPresentation size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded border border-[#E9EEEA] p-4 space-y-2"
        >
          {/* Title */}
          <CustomInput
            label="Content Title"
            name="title"
            register={register}
            placeholder="Enter Content Title"
            errors={errors}
          />

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                {...register("category", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past Event">Past Event</option>
                <option value="Update">Update</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Watch Out">Watch Out</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  Category is required
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register("status", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select type</option>
                <option value="archived">Archived</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              {errors.type && (
                <span className="text-red-500 text-sm">Status is required</span>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              {...register("summary", { required: true })}
              rows={4}
              placeholder="Enter content description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.content && (
              <span className="text-red-500 text-sm">Summary is required</span>
            )}
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              {...register("content", { required: true })}
              rows={4}
              placeholder="Enter content description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.content && (
              <span className="text-red-500 text-sm">
                Description is required
              </span>
            )}
          </div>

          {/* File Upload */}
          <CustomFileUpload
            label="Upload Image/Poster *"
            name="image"
            register={register}
            required={mode === "create"} // only required when creating
            errors={errors}
            preview={
              mode == "create"
                ? preview
                : `https://backend.comcin.com.ng/${initialData?.image}`
            }
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#B20B0B] text-white"
            >
              <FaRegTimesCircle size={18} />
              Cancel
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFEDD5] text-[#C2410C] transition"
            >
              {" "}
              <BsBookmarkDash size={18} />
              {mode === "edit" ? "Update Draft" : "Save as Draft"}{" "}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#0A8625] text-white px-6 py-2 rounded hover:bg-green-700"
            >
              <BsPatchCheck size={18} />
              {mode === "edit"
                ? updateLoading
                  ? "Updating..."
                  : "Update Content"
                : createLoading
                ? "Creating..."
                : "Publish Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
