import { useGetMembersQuery } from "../../services/membersApi";
import memberImage from "../../assets/member.png";
import category from "../../assets/neat.png";
import { Link } from "react-router-dom";

export default function MemberDirectory() {
  const { data, isLoading, error } = useGetMembersQuery();

  const displayMembers = data?.members || [];

  return (
    <section id="members" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-maven text-3xl font-bold text-center text-[#1E1E1E] mb-2">
          Our Member Directory
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Discover our network of trusted microlending and cooperative
          institutions across Nigeria.
        </p>

        {isLoading && <div className="text-center">Loading members...</div>}
        {/* {error && (
          <div className="text-center text-red-500">Error loading members</div>
        )} */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayMembers?.slice(0, 8)?.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl overflow-hidden transition duration-300 relative group"
            >
              {/* Image and logo area */}
              <div className="relative h-50 w-full p-2">
                <img
                  src={memberImage}
                  alt="group"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
                <img
                  src={
                    member.institution_logo
                      ? `https://backend.comcin.com.ng/${member.institution_logo}`
                      : memberImage
                  }
                  alt="logo"
                  className="absolute -bottom-8 left-4 w-16 h-16 bg-white p-1 rounded-full border shadow-md z-10"
                />
              </div>

              {/* Member name */}
              <div className="mt-4 pt-8 pb-20 px-4 text-left">
                <h3 className="text-base font-semibold text-gray-800 leading-tight">
                  {member.institution_name}
                </h3>
              </div>

              <div
                className="absolute -bottom-1 left-0 w-full h-2/3 bg-green-700 text-white rounded-lg 
    translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
    transition-all duration-500 ease-in-out z-20 flex flex-col justify-center 
    items-start px-4 text-right pointer-events-none"
              >
                <img
                  src={
                    member.institution_logo
                      ? `https://backend.comcin.com.ng/${member.institution_logo}`
                      : memberImage
                  }
                  alt="logo"
                  className="w-12 h-12 mb-2 bg-white p-1 rounded-full border shadow-md"
                />
                <p className="text-sm font-semibold">
                  {member.institution_name}
                </p>
                <div className="space-y-1 w-full text-xs">
                  <div className="flex">
                    <span className="min-w-[90px] text-left">Membership:</span>
                    <span className="font-bold text-left">
                      {member?.is_approved ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[90px] text-left">Joined:</span>
                    <span className="font-bold text-left">
                      {new Date(member?.created_at).toDateString()}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="min-w-[90px] text-left">State:</span>
                    <span className="font-bold text-left">
                      {member?.operating_state}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-5 md:w-auto flex justify-end">
          <Link
            to={"/members"}
            className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            View All Members
          </Link>
        </div>
      </div>
    </section>
  );
}
