'use client';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react';
import { Call } from '@stream-io/video-react-sdk';

const Home = () => {
  const now = new Date();
  const [upCommingData, setUpCommingData] = useState('No Meetings Scheduled');
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(
    now,
  );
  const { upcomingCalls } = useGetCalls();

  useEffect(() => {
    if (!upcomingCalls) return;
    // upcomingCalls[0].Call.state?.startsAt?.toLocaleString()
    const upCmCalls = upcomingCalls.map((call: Call) => {
      if ((call as Call).state?.startsAt) {
        const now = new Date();
        const startDate = (call as Call).state?.startsAt?.toLocaleString('en-IN', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second:"2-digit"
        }) ?? '';
        // const startTime = (call as Call).state?.startsAt?.toLocaleString('en-IN', {
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   second:"2-digit"
        // }) ?? '';
        const formattedDate = now.toLocaleDateString('en-IN', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second:"2-digit"
        });
        // const formattedTime = now.toLocaleDateString('en-IN', {
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   second:"2-digit"
        // });
        if(startDate > formattedDate ){

          return startDate
        }
        return '';
      }
    }).sort() || []
    setUpCommingData(upCmCalls[0] || 'No Meetings Scheduled')

  }, [upcomingCalls]);
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: {upCommingData}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
