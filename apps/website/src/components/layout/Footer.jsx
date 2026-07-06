import { ArrowUpRight, Mail, MoveUp } from 'lucide-react'

import Container from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { useProfile } from '@/features/profile/hooks/useProfile'

function Footer() {
  const profileQuery = useProfile()
  const profile = profileQuery.data
  const year = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      label: 'GitHub',
      href: profile?.github,
    },
    {
      label: 'LinkedIn',
      href: profile?.linkedin,
    },
    {
      label: 'Email',
      href: profile?.email ? `mailto:${profile.email}` : undefined,
      icon: Mail,
    },
  ]

  return (
    <footer className="border-t border-border/60 bg-background/70 backdrop-blur-xl">
      <Container className="py-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
              {profile?.name ?? 'Portfolio'}
            </p>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              {profile?.title ?? 'Public portfolio foundation'}
            </p>
            <p className="text-sm text-muted-foreground">
              Copyright {year} {profile?.name ?? 'Portfolio'}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon

                if (!item.href) {
                  return null
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Email' ? undefined : '_blank'}
                    rel={item.label === 'Email' ? undefined : 'noreferrer'}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                    {item.label}
                    {item.label !== 'Email' ? <ArrowUpRight className="size-3.5" /> : null}
                  </a>
                )
              })}
            </div>

            <Button
              type="button"
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full"
              onClick={handleBackToTop}
            >
              Back To Top
              <MoveUp className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer