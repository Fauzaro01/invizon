const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('📊 Checking posts in database...\n')
  
  const allPosts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })
  
  console.log(`Total posts: ${allPosts.length}\n`)
  
  if (allPosts.length === 0) {
    console.log('❌ No posts found in database!')
    console.log('➡️  Create a post from admin panel at /admin/dashboard')
  } else {
    console.log('Posts:')
    allPosts.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.title}`)
      console.log(`   ID: ${post.id}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Category: ${post.category}`)
      console.log(`   Published: ${post.isPublished ? '✅ YES' : '❌ NO'}`)
      console.log(`   Author: ${post.author?.name || 'Unknown'}`)
      console.log(`   Excerpt: ${post.excerpt || 'No excerpt'}`)
      console.log(`   Views: ${post.views}`)
      console.log(`   Created: ${post.createdAt}`)
    })
    
    const publishedCount = allPosts.filter(p => p.isPublished).length
    console.log(`\n📢 Published posts: ${publishedCount}/${allPosts.length}`)
    
    if (publishedCount === 0) {
      console.log('\n⚠️  No published posts! Set isPublished=true in admin panel.')
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
