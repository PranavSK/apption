import { type FC } from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface MagicLinkProps {
  linkUrl: string;
}

const fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

export const MagicLink: FC<MagicLinkProps> = ({ linkUrl }) => (
  <Html>
    <Head />
    <Preview>Click the link to login.</Preview>
    <Body style={{ backgroundColor: '#ffffff' }}>
      <Container style={{ padding: '12px', margin: '0 auto' }}>
        <Img
          style={{ margin: '48px 0' }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB+cMFAgoKyLsqgEAAAGWSURBVFjD7ZcxS0MxFIW/1i5qcWiLIOgPqA5SiohDVRAVsf4DZwd1EZwUXERH3Qtu/QmCk4MUQcRFFIutdajFRVFwsAjV69AgbX157zV1Kb6TIY93T85JLiG58eEGfsZIMkEfvcAzRU444tTVWBdYIItYtFPGWxf3s28pXm2frDsJ+Bzie6yprwsOueIJiBAjSUz932LbfP7Taqb3zPyKzfOIIFSYNJXvIIcgFOi3jA9QQhAuHfOgwRyC8EVCy5hSK5w1M0gjCMe2nAyCcGBmUEAQlmw5qwhCzkS+Ry1/2JYVU6wuHcGvHRpRfdHWoKT6sI4Q0A79IAXAm63Bq+pDPJikyQ2qKYo3n6I/gmfwDwwaz8Ewm4zQ2YRCdYNmeQfKnLPDi54c5M7m/nLX8nTrDVZalheE5VrJ+qNiEIAMacOEL5IAhvQGAZXPlKFBnESjZvtvU8/AM/AMPAPPoC0M6m+0CgBRh0eHHtEaFUuDGwASNq8yN7jWh4LkW64pbuvLlsbCK8QGo00VXrUoc8buz6PEgzt8A6kG1DJHGDigAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTEyLTIwVDA4OjQwOjQyKzAwOjAwCQTZ/gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0xMi0yMFQwODo0MDo0MiswMDowMHhZYUIAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMTItMjBUMDg6NDA6NDMrMDA6MDCJO0spAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="
        />
        <Heading
          as="h2"
          style={{
            color: '#333',
            fontFamily,
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '48px 0',
            padding: '0',
          }}
        >
          Apption Magic Link
        </Heading>
        <Text style={{ color: '#333', fontFamily, fontSize: '20px', margin: '24px 0' }}>
          The following link can be used to automatically sign you in.
        </Text>
        <Link
          href={linkUrl}
          style={{ fontFamily, fontSize: '20px', display: 'block', marginBottom: '16px' }}
        >
          Click here to log in.
        </Link>
      </Container>
    </Body>
  </Html>
);

export default MagicLink;
