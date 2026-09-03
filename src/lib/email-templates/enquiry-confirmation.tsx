import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  message?: string
}

const Email = ({ name, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your message has reached ODCORRECT</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>ODCORRECT — THE FOUNDATION</Text>
        <Heading style={heading}>Your message has reached us</Heading>

        <Text style={body}>
          {name ? `${name},` : 'Thank you,'}
        </Text>
        <Text style={body}>
          Thank you for writing to the house. Every enquiry is read personally. We reply
          within three working days.
        </Text>

        {message ? (
          <>
            <Text style={label}>What you sent</Text>
            <Text style={quote}>{message}</Text>
          </>
        ) : null}

        <Hr style={rule} />
        <Text style={footer}>
          ODCORRECT — Luxury. Without Compromise.
          <br />
          ceo@odcorrect.in
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your message has reached ODCORRECT',
  displayName: 'Enquiry confirmation (visitor)',
  previewData: {
    name: 'Ananya',
    message: 'I would like to know more about the first chapter.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: '#111111',
}
const container = { padding: '48px 32px', maxWidth: '600px' }
const eyebrow = {
  fontSize: '11px',
  letterSpacing: '0.22em',
  color: '#8C8C8C',
  margin: '0 0 18px',
}
const heading = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: '28px',
  fontWeight: 400,
  color: '#050505',
  margin: '0 0 28px',
}
const body = { fontSize: '16px', lineHeight: '28px', color: '#111111', margin: '0 0 18px' }
const label = {
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#8C8C8C',
  margin: '26px 0 8px',
}
const quote = {
  fontSize: '15px',
  lineHeight: '26px',
  color: '#4a4a4a',
  borderLeft: '2px solid #C8A96A',
  padding: '4px 0 4px 16px',
  whiteSpace: 'pre-wrap' as const,
  margin: '0 0 28px',
}
const rule = { borderColor: '#E6E1D7', margin: '32px 0 16px' }
const footer = { fontSize: '12px', lineHeight: '20px', color: '#8C8C8C', margin: 0 }
