import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/constants';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';

const Home = async () => {
  // const result = await db.select().from(users).limit(10);
  // console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <BookOverview {...sampleBooks[3]} />
      <BookList
        title="Latest books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
