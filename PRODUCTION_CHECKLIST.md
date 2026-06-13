# Production Deployment Checklist

## Pre-Deployment

- [ ] Set strong `NEXTAUTH_SECRET` (random 64+ chars)
- [ ] Set `ENCRYPTION_KEY` (32+ random chars)
- [ ] Configure production PostgreSQL database
- [ ] Set `RESEND_API_KEY` for email sending
- [ ] Set `NEXTAUTH_URL` to production domain
- [ ] Run `npx prisma migrate deploy` for schema
- [ ] Run `npm run build` to verify build

## Environment Variables (Required)

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=https://yourdomain.com
RESEND_API_KEY=re_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ENCRYPTION_KEY=<random-key>
NEXT_PUBLIC_DEMO_MODE=false
```

## Deployment Options

### Vercel (Recommended)
1. Connect GitHub repo
2. Set environment variables
3. Deploy with `npm run build`
4. Configure custom domain

### Docker
```bash
docker compose up -d
```

### Manual
```bash
npm run build
npm run start
```

## Post-Deployment

- [ ] Verify database connection
- [ ] Test user registration & login
- [ ] Test client creation & analysis
- [ ] Test verdict engine
- [ ] Test email generation
- [ ] Test PDF export
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure backup schedule

## Monitoring

- Vercel Analytics for traffic
- Sentry for error tracking (recommended)
- Database connection pooling (PgBouncer recommended)
- Regular backups of PostgreSQL
