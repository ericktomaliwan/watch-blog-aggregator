import { Link } from 'react-router-dom';
import { Heading, Subheading } from '../../components/heading'

export default function HomePage() {
  return (
    <div>
      <Heading>Welcome to Watch Blog Aggregator</Heading>

      <div className="mt-8 flex items-end justify-between">
        <Subheading>Featured Content</Subheading>
      </div>

      <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-6">
        <Subheading>Featured Content</Subheading>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">Lorem Ipsum</h3>
            <p className="text-gray-600 text-sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold">Lorem Ipsum</h3>
            <p className="text-gray-600 text-sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold">Lorem Ipsum</h3>
            <p className="text-gray-600 text-sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
