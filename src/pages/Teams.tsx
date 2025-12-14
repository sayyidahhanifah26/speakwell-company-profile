import React, { useEffect } from 'react';
import { useTeamStore } from '../store/useTeamStore';

const Teams: React.FC = () => {
  const { teams, isLoading, error, fetchTeams } = useTeamStore();

  useEffect(() => {
    if (teams.length === 0) {
        fetchTeams(9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <p className="text-xl font-medium text-blue-700">Memuat anggota tim...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <p className="text-xl font-medium text-red-600">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-20 px-6 md:px-16">
      <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-14">
        Mentor SpeakWell
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {teams.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-blue-100 shadow-lg rounded-2xl p-6 flex flex-col justify-start items-center text-center transition duration-300 hover:scale-[1.01] hover:shadow-2xl"
          >
            <img
              src={member.pictureUrl}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-5 shadow-lg object-cover border-4 border-blue-200"
            />

            <h3 className="text-xl font-bold text-blue-700">{member.name}</h3>

            <p className="text-gray-600 font-medium mb-3">{member.role}</p>

            <p className="text-gray-500 text-sm leading-relaxed max-w-[230px]">
              {member.bio}
            </p>
            
            {member.email && (
                <p className="text-xs text-gray-400 mt-2">{member.email}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teams;