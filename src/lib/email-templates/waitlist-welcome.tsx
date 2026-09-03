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

const Email = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You are on the private list</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>ODCORRECT — THE FOUNDATION</Text>
        <Heading style={heading}>You are on the private list</Heading>

        <Text style={body}>
          The first chapter is not yet open. When it is, you will hear from us before
          anyone else — once, quietly, with no announcement elsewhere.
        </Text>
        <Text style={body}>Until then, nothing further is required of you.</Text>

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
  subject: 'You are on the private list — ODCORRECT',
  displayName: 'Private list welcome',
  previewData: {},
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
const rule = { borderColor: '#E6E1D7', margin: '32px 0 16px' }
const footer = { fontSize: '12px', lineHeight: '20px', color: '#8C8C8C', margin: 0 }
