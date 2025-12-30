const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Looking for a user to be the author...\n')
  
  // Find first user in database
  const user = await prisma.user.findFirst()
  
  if (!user) {
    console.log('❌ No user found! Please register a user first.')
    console.log('➡️  Go to /auth/register to create an account')
    return
  }
  
  console.log(`✅ Found user: ${user.name} (${user.email})`)
  console.log('\n📝 Creating sample blog post...\n')
  
  const samplePost = {
    title: 'Selamat Datang di Blog Invizone!',
    slug: 'selamat-datang-di-blog-invizone',
    excerpt: 'Ini adalah post pertama kami. Mari kita mulai perjalanan belajar bersama!',
    content: `# Selamat Datang! 🎉

Halo teman-teman Invizone! Ini adalah **blog post pertama** kami.

## Apa itu Markdown?

Markdown adalah format penulisan yang memudahkan kita membuat konten yang terstruktur dan menarik.

### Fitur yang Tersedia:

- **Bold text** dengan \`**text**\`
- *Italic text* dengan \`*text*\`
- \`Inline code\` dengan backticks
- Link dan gambar
- Dan masih banyak lagi!

## Contoh Code Block

\`\`\`javascript
function hello() {
  console.log('Hello, Invizone!');
}
\`\`\`

## Table Example

| Nama      | Nilai |
|-----------|-------|
| Student 1 | 95    |
| Student 2 | 90    |

---

> Ini adalah blockquote. Sangat berguna untuk highlight informasi penting!

Mari kita mulai berbagi cerita dan pengalaman kita di blog ini! 🚀`,
    category: 'ANNOUNCEMENTS',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    isPublished: true,
    views: 0,
    authorId: user.id
  }
  
  try {
    const post = await prisma.post.create({
      data: samplePost
    })
    
    console.log('✅ Sample post created successfully!')
    console.log(`   Title: ${post.title}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Published: ${post.isPublished}`)
    console.log(`   URL: /blog/${post.slug}`)
    console.log('\n🎉 Go to /blog to see your post!')
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Post with this slug already exists!')
      console.log('➡️  Check your database or try a different title')
    } else {
      console.error('❌ Error creating post:', error.message)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
