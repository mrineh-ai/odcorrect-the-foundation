import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  subject?: string
  message?: string
  receivedAt?: string
}

const Email = ({ name, email, subject, message, receivedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New enquiry from ${name || 'a visitor'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>ODCORRECT — THE FOUNDATION</Text>
        <Heading style={heading}>A new enquiry has arrived</Heading>

        <Section style={card}>
          <Text style={label}>From</Text>
          <Text style={value}>{name || 'Not provided'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>
            {email ? (
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            ) : (
              'Not provided'
            )}
          </Text>

          <Text style={label}>Subject</Text>
          <Text style={value}>{subject || 'No subject'}</Text>

          {receivedAt ? (
            <>
              <Text style={label}>Received</Text>
              <Text style={value}>{receivedAt}</Text>
            </>
          ) : null}
        </Section>

        <Text style={label}>Message</Text>
        <Text style={messageStyle}>{message || 'No message provided.'}</Text>

        <Hr style={rule} />
        <Text style={footer}>Sent automatically from odcorrect.in</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New enquiry — ${data['subject'] || data['name'] || 'ODCORRECT'}`,
  displayName: 'Enquiry notification (house)',
  to: 'ceo@odcorrect.in',
  previewData: {
    name: 'Ananya Rao',
    email: 'ananya@example.com',
    subject: 'Private list enquiry',
    message: 'I would like to know more about the first chapter and its availability in Mumbai.',
    receivedAt: '3 September 2026, 16:42 IST',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: '#111111',
}
const container = { padding: '40px 32px', maxWidth: '600px' }
const eyebrow = {
  fontSize: '11px',
  letterSpacing: '0.22em',
  color: '#8C8C8C',
  margin: '0 0 18px',
}
const heading = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: '26px',
  fontWeight: 400,
  color: '#050505',
  margin: '0 0 24px',
}
const card = {
  border: '1px solid #E6E1D7',
  borderLeft: '3px solid #C8A96A',
  padding: '20px 22px',
  margin: '0 0 26px',
}
const label = {
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#8C8C8C',
  margin: '0 0 4px',
}
const value = { fontSize: '15px', color: '#111111', margin: '0 0 16px' }
const messageStyle = {
  fontSize: '15px',
  lineHeight: '26px',
  color: '#111111',
  whiteSpace: 'pre-wrap' as const,
  margin: '0 0 28px',
}
const link = { color: '#8a6d2f', textDecoration: 'underline' }
const rule = { borderColor: '#E6E1D7', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#8C8C8C', margin: 0 }
