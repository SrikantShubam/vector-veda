export default function LegacyPrivacyPolicy() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/privacy-policy",
      permanent: true
    }
  };
}
