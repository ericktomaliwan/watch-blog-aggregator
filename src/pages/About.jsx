import { Text } from 'components/text'
import { Subheading } from 'components/heading'


export default function About() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">About Watch Blog Aggregator</h1>
            <div className="prose prose-lg max-w-none">
                <Text>Welcome to Watch Blog Aggregator, your one-stop destination for all things watch-related.</Text>
                <Text>
                    We aggregate the latest news, reviews, and insights from the world of horology, 
                    bringing you the most comprehensive collection of watch content in one place.
                </Text>
                <Subheading>Our Mission</Subheading>
                <Text>
                    To make watch information accessible and organized for enthusiasts, collectors, 
                    and anyone interested in the fascinating world of timepieces.
                </Text>
            </div>
        </div>
    )
}