const ProfileCard = ({ user }) => {
  const { first_name, last_name, email, image } = user;
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="relative w-96 h-auto bg-gray-400 rounded-md pt-24 pb-8 px-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
        <div className="absolute rounded-full bg-gray-100 w-28 h-28 p-2 z-10 -top-8 shadow-lg hover:shadow-xl transition">
          <div className="rounded-full bg-black w-full h-full overflow-auto">
            <img src={`${process.env.REACT_APP_SERVER_URL}/images/${image}`} />
          </div>
        </div>
        <label className="font-bold text-gray-100 text-lg">{first_name + " " + last_name}</label>
        <label className="text-gray-100 text-sm">{email}</label>
      </div>
    </div>
  );
};

export default ProfileCard;
